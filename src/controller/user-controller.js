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
}

const getUsers = async (req, res, next) => {
    try {
        const result = await userService.getUsers();
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export default  {
    register,
    getUsers
}