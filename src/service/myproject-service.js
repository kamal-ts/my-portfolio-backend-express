import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createMyprojectValidation, getMyprojectValidation, searchMyprojectValidation, updateMyprojectValidation } from "../validation/myproject-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, request) => {

    const myproject = validate(createMyprojectValidation, request);
    myproject.author = user.username;
    return prismaClient.myProject.create({
        data: myproject,
        select: {
            id: true,
            title: true,
            tag: true,
            category: true,
            description: true,
            link_git: true,
            link_web: true,
            image: true,
            createdAt: true,
            updatedAt: true
        }
    });
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
            image: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (!myproject) throw new ResponseError(404, "myproject is not found");

    return myproject
};

const update = async (user, request) => {
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

    return prismaClient.myProject.update({
        where: {
            id: myproject.id
        },
        data: {
            title: myproject.title,
            tag: myproject.tag,
            category: myproject.category,
            description: myproject.description,
            link_web: myproject.link_web,
            link_git: myproject.link_git,
            image: myproject.image,
        },
        select: {
            id: true,
            title: true,
            tag: true,
            category: true,
            description: true,
            link_git: true,
            link_web: true,
            image: true,
            createdAt: true,
            updatedAt: true
        }
    });
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
        throw new ResponseError(404, "contact is not found");
    };

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
            image: true,
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