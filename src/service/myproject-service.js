import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import imageCloudinary from "../util/imageCloudinary.js";
import { createMyprojectValidation, getMyprojectValidation, searchMyprojectValidation, updateMyprojectValidation } from "../validation/myproject-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request, file) => {

    const myproject = validate(createMyprojectValidation, request);
    myproject.author = user.username;

    console.log('file', file)
    // Upload gambar ke cloud dan tunggu hasilnya
    const image = await imageCloudinary.uploadImageToCloud(file);
    const result = await prismaClient.myProject.create({
        data: myproject,
        select: {
            id: true,
            title: true,
            tag: true,
            category: true,
            description: true,
            link_git: true,
            link_web: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (image !== null) {
        result.image = await prismaClient.image.create({
            data: {
                public_id: image.public_id,
                secure_url: image.secure_url,
                format: image.format,
                display_name: image.display_name,
                resource_type: image.resource_type,
                my_project_id: result.id
            }
        })
    }

    return result;
};

const get = async (myprojectId) => {
    myprojectId = validate(getMyprojectValidation, myprojectId);
    const myproject = await prismaClient.myProject.findFirst({
        where: {
            id: myprojectId
        },
        select: {
            id: true,
            title: true,
            tag: true,
            category: true,
            description: true,
            link_git: true,
            link_web: true,
            image: {
                select: {
                    secure_url: true,
                    public_id: true
                }
            },
            createdAt: true,
            updatedAt: true
        }
    });

    if (!myproject) throw new ResponseError(404, "myproject is not found");

    return myproject
};

const update = async (user, request, file) => {
    const myproject = validate(updateMyprojectValidation, request);
    const countMyproject = await prismaClient.myProject.count({
        where: {
            id: myproject.id,
            author: user.username,
        }
    });

    if (countMyproject !== 1) {
        throw new ResponseError(404, "myproject is not found");
    };

    const result = await prismaClient.myProject.update({
        where: {
            id: myproject.id
        },
        data: {
            title: myproject.title,
            tag: myproject.tag,
            status: myproject.status,
            category: myproject.category,
            description: myproject.description,
            link_web: myproject.link_web,
            link_git: myproject.link_git,
        },
        select: {
            id: true,
            title: true,
            tag: true,
            status: true,
            category: true,
            description: true,
            link_git: true,
            link_web: true,
            createdAt: true,
            updatedAt: true
        }
    });

    const findImage = await prismaClient.image.findFirst({
        where: {
            my_project_id: myproject.id
        }
    });

    if (findImage !== null) {
        console.log('jika mau update image');
        // image arready have, but they wanna change image
        const image = await imageCloudinary.updateImageCloud(file, findImage.public_id);
        if (image !== null) {
            const resultImage = await prismaClient.image.update({
                where: {
                    public_id: image.public_id
                },
                data: {
                    secure_url: image.secure_url,
                    format: image.format,
                    display_name: image.display_name,
                    resource_type: image.resource_type,
                }
            })
            if (!resultImage) {
                throw new ResponseError(404, "image's public ID is not found")
            }
            result.image = resultImage; 
        }
        
    } else {
        console.log('jika mau upload image' );
        const image = await imageCloudinary.uploadImageToCloud(file);
        if (image !== null) {
            const resultImage = await prismaClient.image.create({
                data: {
                    public_id: image.public_id,
                    secure_url: image.secure_url,
                    format: image.format,
                    display_name: image.display_name,
                    resource_type: image.resource_type,
                    my_project_id: myproject.id
                }
            });
            result.image = resultImage;
        }
    }

    return result;
};

const remove = async (user, myprojectId) => {
    myprojectId = validate(getMyprojectValidation, myprojectId);
    const totalIndDatabase = await prismaClient.myProject.count({
        where: {
            author: user.username,
            id: myprojectId
        }
    });

    if (totalIndDatabase !== 1) {
        throw new ResponseError(404, "project  ID is not found");
    };

    // find image from image table by myprojectId
    const image = await prismaClient.image.findFirst({
        where: { my_project_id: myprojectId }
    })
    
    if (image) {
        // delete image form cloudinary by public_id
        const deleteImageFromCLoud = await imageCloudinary.deleteImageCloud(image.public_id);
        console.log('deleteImageFromCLoud', deleteImageFromCLoud);
    }

    // delete data myproject by myprojectId
    return prismaClient.myProject.delete({
        where: {
            id: myprojectId
        }
    });
};

const search = async (request) => {
    request = validate(searchMyprojectValidation, request);
    const skip = (request.page - 1) * request.size;
    const where = {};
    const conditions = [];
    if (request.title) {
        conditions.push({
            title: {
                contains: request.title,
                mode: 'insensitive', // case-insensitive search
            }
        });
    };

    if (request.tag) {
        const searchTags = request.tag.split(',').map(tag => tag.trim());
        const searchConditions = searchTags.map(tag => ({
            tag: {
                contains: tag,
                mode: 'insensitive'
            }
        }));
        conditions.push({ OR: [...searchConditions] });
    };

    if (request.category) {
        const searchCategory = request.category.split(',').map(category => category.trim());
        const searchConditions = searchCategory.map(category => ({
            category: {
                contains: `${category}`,
                mode: 'insensitive'
            }
        }));
        conditions.push({ OR: [...searchConditions] });
    };

    if (request.status) {
        conditions.push({
            status: request.status
        });
    };

    if (conditions.length > 0) {
        where.AND = conditions;
    };

    const myproject = await prismaClient.myProject.findMany({
        where,
        take: request.size,
        skip: skip,
        select: {
            id: true,
            title: true,
            tag: true,
            category: true,
            image: {
                select: {
                    secure_url: true
                }
            },
            createdAt: true,
        }
    });

    const totalItems = await prismaClient.myProject.count({
        where
    });

    return {
        data: myproject,
        paging: {
            current_page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    };
};

export default {
    create,
    get,
    update,
    remove,
    search
};