import Joi from "joi";

export const signup=Joi.object({
    userName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    country:Joi.string().required(),
    role:Joi.string().valid("admin","user").required()
}).required();

export const activateAccount=Joi.object({
    token:Joi.string().required()
}).required();

export const login=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
}).required()

export const forgetCode=Joi.object({
    email:Joi.string().email().required(),
}).required();

export const resetPassword=Joi.object({
    email:Joi.string().email().required(),
    forgetCode:Joi.string().length(5).required(),
    password:Joi.string().required(),
}).required();

export const updatePasswordSchema=Joi.object({
    password:Joi.string().required(),
    newPassword:Joi.string().required(),
}).required();

export const userDataSchema=Joi.object({
    userName:Joi.string(),
    country:Joi.string(),
}).required()