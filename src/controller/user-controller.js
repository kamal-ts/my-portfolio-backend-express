import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const get = async(req, res, next) => {
    try {
        const username = "TODO";
        const result = await userService.get(username);
        res.status(200).json({
            data: result
        });

    } catch (error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const result = await userService.getUsers(req.body);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export default  {
    register,
    login,
    get,
    getUsers
};