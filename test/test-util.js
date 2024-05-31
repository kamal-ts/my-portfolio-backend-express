import { prismaClient } from "../src/application/database.js";
import bcrypt from 'bcrypt';

// user
export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test",
        }
    })
};

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
};

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
};

// myproject
export const removeAllTestMyproject = async () => {
    await prismaClient.myProject.deleteMany({
        where: {
            author: "test"
        }
    });
};

export const createTestMyproject = async () => {
    await prismaClient.myProject.create({
        data: {
            author: "test",
            title: "test",
            tag: ["test"],
            category: ["test"],
            description: "test",
            link_web: "test.web",
            link_git: "test.git",
            image: "test.jpg",
        }
    })
};

export const getTestMyproject = async () => {
    return prismaClient.myProject.findFirst({
        where : {
            author: "test"
        }
    })
};
