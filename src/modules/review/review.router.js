import { Router } from "express";
import { isAuthenticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as reviewSchema from "./review.schema.js";
import * as reviewController from "./review.controller.js";

const router=Router();

// ^ create review
// id anime 
router.post("/:id",isAuthenticated,isAuthorized("user"),validation(reviewSchema.createReview),reviewController.createReview);

// ^ update review
// id review
router.patch("/:id",isAuthenticated,isAuthorized("user"),validation(reviewSchema.updateReview),reviewController.updateReview);

// ^ delete review
// id review
router.delete("/:id",isAuthenticated,isAuthorized("user","admin"),validation(reviewSchema.deleteReview),reviewController.deleteReview);

// ^ all Reviews
router.get("/",reviewController.allReview);

// ^ spicific review
// ! id =======> anime id 
router.get("/:id",validation(reviewSchema.spicificReview),reviewController.spicificReview);


export default router