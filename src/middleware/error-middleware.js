import { ResponseError, ValidationError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        // chack whether there is error or not, if not direct continue
        next();
        return;
    }

    if (err instanceof ResponseError) {
        // if error is instance of "ResponseError"
        res.status(err.status).json({
            errors: err.message,
        }).end(); // then "end" so it dosen't continue  
    }
    else if (err instanceof ValidationError) {
            res.status(400).json({
            errors: err.message,
            details: err.formatErrors()
        }).end();
    }
    else {
        // if there is kind of error that can't continue
        res.status(500).json({
            errors: err.message,
        }).end();
    }
}

export {
    errorMiddleware,
}