import { Router } from "express";
import { isAuthenticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as characterSchema from "../character/character.schema.js";
import * as characterController from "../character/character.controller.js"
import { fileUpload } from "../../utils/fileUpload.js";

const router=Router();

// ^ create character
// ! id ======> anime id
router.post("/:id",isAuthenticated,isAuthorized("admin"),fileUpload().single("image"),validation(characterSchema.createCharacter),characterController.createCharacter)

// ^ update character
// ! id ======> character id
router.patch("/:id",isAuthenticated,isAuthorized("admin"),fileUpload().single("image"),validation(characterSchema.updateCharacter),characterController.updateCharacter)

// ^ delete character
router.delete("/:id",isAuthenticated,isAuthorized("admin"),validation(characterSchema.deleteCharacter),characterController.deleteCharacter);

// ^ all character
router.get("/",characterController.allCharacter);



// ^ spicific character
// ! id ===========> anime id
router.get("/spicific/:id",characterController.spicificCharacter);
// ^  character details
// ! id ===========> character id
router.get("/chracterDetails/:id",characterController.chracterDetails);

// ^ search character
router.get("/searchCharacter/:id",characterController.searchByname);

export default router;