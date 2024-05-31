import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createMyprojectValidation, getMyprojectValidation } from "../validation/myproject-validation.js";
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
            createdAt: true
        }
    });

    if (!myproject) throw new ResponseError(404, "myproject is not found");

    return myproject
}

export default {
    create,
    get,
}