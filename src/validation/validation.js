import { ValidationError } from "../error/response-error.js";

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknow: false,
    });
    if (result.error) {
        // throw new ResponseError(400, result.error.message);
        throw new ValidationError(400, result.error.details);
    } else {
        return result.value;
    }
};


export {
    validate,
}
