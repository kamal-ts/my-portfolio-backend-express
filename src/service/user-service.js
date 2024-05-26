import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid'

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

const login = async (request) => {

    const loginRequest = validate(loginUserValidation, request);

    // search user data base on username in requst data
    let user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        }
    });

    // check whether the user is exist then reject it if not exist
    if (!user) {

        throw new ResponseError(401, "username or password is wrong");
    }

    // check whether the password from request data and from user data is match or not using bcrypt compare
    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

    // rejact it when not match
    if (!isPasswordValid) {
        throw new ResponseError(401, "usename or password is wrong");
    }

    const token = uuid().toString();
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
};

const get = async (username) => {
    username = validate(getUserValidation, username);
    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    });

    if (!user) throw new ResponseError(404, "user is not found");
    return user;
};

const update = async (request) => {
    const user = validate(updateUserValidation, request);
    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser !== 1) throw new ResponseError(404, "user is not found");
    
    const data = {};
    if (user.name) data.name = user.name;
    if (user.password) data.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.update({
        where: {
            username: user.username,
        },
        data: data,
        select: {
            username: true,
            name: true,
        }
    });
};

const logout = async (username) => {
    username = validate(getUserValidation, username);
    const user = await prismaClient.user.findUnique({
        where: {
            username: username,
        }
    });

    if (!user) throw new ResponseError(404, "User is not found");
    
    return prismaClient.user.update({
        where: {
            username: user.username,
        },
        data: {
            token: null,
        },
        select: {
            username: true,
        }
    });
    
}

const getUsers = async () => {

    const user = await prismaClient.user.findMany();

    return user;
};

export default {
    register,
    getUsers,
    login,
    update,
    logout,
    get,
}