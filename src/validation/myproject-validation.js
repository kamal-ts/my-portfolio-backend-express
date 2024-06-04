import Joi from "joi";

const createMyprojectValidation = Joi.object({
    title: Joi
        .string()
        .max(100)
        .required(),
    tag: Joi
        .array()
        .items(Joi
            .string()
            .max(100)),
    category: Joi
        .array()
        .items(Joi
            .string()
            .max(100)),
    description: Joi
        .string()
        .required(),
    link_web: Joi
        .string()
        .max(100),
    link_git: Joi
        .string()
        .max(100)
        .required(),
    image: Joi
        .string()
        .max(100)
});

const getMyprojectValidation = Joi.number().positive().required();

const updateMyprojectValidation = Joi.object({
    id: Joi
        .number()
        .positive()
        .required(),
    title: Joi
        .string()
        .max(100)
        .required(),
    tag: Joi
        .array()
        .items(Joi
            .string()
            .max(100)),
    category: Joi
        .array()
        .items(Joi
            .string()
            .max(100)),
    description: Joi
        .string()
        .required(),
    link_web: Joi
        .string()
        .max(100),
    link_git: Joi
        .string()
        .max(100)
        .required(),
    image: Joi
        .string()
        .max(100)
});

export {
    createMyprojectValidation,
    getMyprojectValidation,
    updateMyprojectValidation,
}