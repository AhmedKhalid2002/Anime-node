import { Router } from "express";
import { isAuthenticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as seasonSchema from './season.schema.js'
import * as seasonController from './season.controller.js'

const router =Router();

// ^ create season
// ! id ===========> anime id
router.post("/:id",isAuthenticated,isAuthorized("admin"),validation(seasonSchema.createSeason),seasonController.createSeason)

// ^ update season
// ! id ============> season
router.patch("/:id",isAuthenticated,isAuthorized("admin"),validation(seasonSchema.updateSeason),seasonController.updateSeason)

// ^ delete season
// ! id ============> season
router.delete("/:id",isAuthenticated,isAuthorized("admin"),validation(seasonSchema.deleteSeason),seasonController.deleteSeason)

// ^ all Season
router.get("/",seasonController.allSeason)

// ^ spicific season
// ! id ============> season
router.get("/spicificSeason/:id",seasonController.spicificSeason)

export default router;