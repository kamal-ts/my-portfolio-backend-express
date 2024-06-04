import myprojectService from '../service/myproject-service.js'


const create = async (req, res, next) => {
    try {
        const user =  req.user;
        const request = req.body;
        const result = await myprojectService.create(user, request);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const myprojectId = req.params.myprojectId;
        const result = await myprojectService.get(user, myprojectId);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const myprojectId = req.params.myprojectId;
        const request = req.body;
        request.id = myprojectId;

        const result = await myprojectService.update(user, request);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error)
    }
}   

export default {
    create,
    get,
    update,
}