import myprojectService from '../service/myproject-service.js'


const create = async (req, res, next) => {
    try {
        const user =  req.user;
        const request = req.body;
        const file = req.files ? req.files : null;
        console.log('file', file)
        const result = await myprojectService.create(user, request, file);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const myprojectId = req.params.myprojectId;
        const result = await myprojectService.get(myprojectId);
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
};

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const myprojectId = req.params.myprojectId;
        await myprojectService.remove(user, myprojectId);
        
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error)
    }

}

const search = async (req, res, next) => {
    try {

        const request = {
            title: req.query.title,
            tag: req.query.tag,
            category: req.query.category,
            page: req.query.page,
            size: req.query.size
        }
        
        const result = await myprojectService.search(request);
        res.status(200).json(result);
        
    } catch (error) {
        next(error)
    }
}

export default {
    create,
    get,
    update,
    remove,
    search,
}