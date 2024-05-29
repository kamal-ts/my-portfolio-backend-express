import { prismaClient } from "../application/database.js";
import { createMyprojectValidation } from "../validation/myproject-validation.js";
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
            createdAt: true
        }
    });

};


export default {
    create
}