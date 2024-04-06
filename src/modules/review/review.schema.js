import Joi from "joi";
import { validObjectId } from "../../middleware/validation.middleware.js";

export const createReview=Joi.object({
    rating:Joi.number().min(1).max(10).required(),
    comment:Joi.string().required(),
    id:Joi.string().custom(validObjectId).required()
}).required();

export const updateReview=Joi.object({
    rating:Joi.number().min(1).max(10),
    comment:Joi.string(),
    id:Joi.string().custom(validObjectId).required(),
    animeId:Joi.string().custom(validObjectId).required(),
}).required();

export const spicificReview=Joi.object({
    id:Joi.string().custom(validObjectId).required()
}).required()