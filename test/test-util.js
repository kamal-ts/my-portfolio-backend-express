import { prismaClient } from "../src/application/database.js";

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
            password: "rahasia",
            name: "test",
            token: "test"
        }
    })
};
