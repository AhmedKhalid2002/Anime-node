import Joi from "joi";
import { validObjectId } from "../../middleware/validation.middleware.js";

export const createCharacter=Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    id:Joi.string().custom(validObjectId).required()
}).required();

export const updateCharacter=Joi.object({
    name:Joi.string(),
    description:Joi.string(),
    id:Joi.string().custom(validObjectId).required(),
}).required();

export const deleteCharacter=Joi.object({
    id:Joi.string().custom(validObjectId).required(),
}).required()

