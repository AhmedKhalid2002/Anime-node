import Joi from "joi";
import { validObjectId } from "../../middleware/validation.middleware.js";

export const createSeason=Joi.object({
    seasonNumber:Joi.number().required(),
    year:Joi.string().required(),
    episodes:Joi.number().required(),
    id:Joi.string().custom(validObjectId).required()
}).required();

export const updateSeason=Joi.object({
    seasonNumber:Joi.number(),
    year:Joi.string(),
    episodes:Joi.number(),
    id:Joi.string().custom(validObjectId).required()
}).required();

export const deleteSeason=Joi.object({
    id:Joi.string().custom(validObjectId).required()
}).required();

export const spicificSeason=Joi.object({
    id:Joi.string().custom(validObjectId).required()
}).required();