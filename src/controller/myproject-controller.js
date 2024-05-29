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


export default {
    create
}