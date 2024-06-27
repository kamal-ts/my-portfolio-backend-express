import Joi from "joi";

const createMyprojectValidation = Joi.object({
    title: Joi
        .string()
        .max(100)
        .required(),
    tag: Joi
        .string()
        .max(200)
        .pattern(/^\S+$/)
        .required(),
    category: Joi
        .string()
        .max(200)
        .pattern(/^\S+$/)
        .required(),
    description: Joi
        .string()
        .required(),
    link_web: Joi
        .string()
        .max(100)
        .optional(),
    link_git: Joi
        .string()
        .max(100)
        .required(),
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
        .string()
        .max(200)
        .pattern(/^\S+$/)
        .required(),
    category: Joi
        .string()
        .max(200)
        .pattern(/^\S+$/)
        .required(),
    description: Joi
        .string()
        .required(),
    link_web: Joi
        .string()
        .max(100)
        .optional(),
    link_git: Joi
        .string()
        .max(100)
        .required()
});

const searchMyprojectValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    title: Joi.string().optional(),
    tag: Joi
        .string()
        .max(200)
        .pattern(/^\S+$/),
    category: Joi
        .string()
        .max(200)
        .pattern(/^\S+$/),
});

export {
    createMyprojectValidation,
    getMyprojectValidation,
    updateMyprojectValidation,
    searchMyprojectValidation
}