import Joi from "joi";
import { validObjectId } from "../../middleware/validation.middleware.js";

export const addAnime=Joi.object({
    name:Joi.string().required(),
    genre:Joi.string().required(),
    episode:Joi.number().required(),
    synopise:Joi.string().required(),
    releaseDate:Joi.string().required(),
    status:Joi.string().required(),
    studio:Joi.string().required(),
    director:Joi.string().required(),
}).required();


export const addVideo=Joi.object({
    id:Joi.string().custom(validObjectId).required(),
    videoNumber:Joi.number().required()
}).required();

export const updateAnime=Joi.object({
    name:Joi.string(),
    genre:Joi.string(),
    episode:Joi.number(),
    synopise:Joi.string(),
    releaseDate:Joi.string(),
    status:Joi.string(),
    studio:Joi.string(),
    director:Joi.string(),
    id:Joi.string().custom(validObjectId).required(),
}).required();

export const deleteAnime=Joi.object({
    id:Joi.string().custom(validObjectId).required(),
}).required()