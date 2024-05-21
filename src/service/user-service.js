import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from 'bcrypt';


const register = async (request) => {

    // validasi user data from 'request' 
    const user = validate(registerUserValidation, request);

    /*
    * Check whether the username has been registered or not
    * if it has been registered, it should cencel
    */
    const countUser = await prismaClient.user.count({
        where: {
            username: user.username,
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "username already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    const result = await prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
        }
    });

    return result;
};


const getUsers = async () => {

    const user = await prismaClient.user.findMany();
    
    return user;
};

export default {
    register,
    getUsers
}