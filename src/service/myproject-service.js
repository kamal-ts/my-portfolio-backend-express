import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createMyprojectValidation, getMyprojectValidation, updateMyprojectValidation } from "../validation/myproject-validation.js";
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

const get = async (user, myprojectId) => {
    myprojectId = validate(getMyprojectValidation, myprojectId);
    const myproject = await prismaClient.myProject.findFirst({
        where: {
            author: user.username,
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

    if (countMyproject !== 1 ) {
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

export default {
    create,
    get,
    update,
};