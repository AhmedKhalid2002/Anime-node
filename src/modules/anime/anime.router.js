import { Router } from "express";
import { isAuthenticated } from "../../middleware/authuntication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import { fileUpload } from "../../utils/fileUpload.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as animeSchema from "../../modules/anime/anime.schema.js"
import * as animeController from "../../modules/anime/anime.controller.js"

const router=Router();

// ^ create Anime
router.post('/',isAuthenticated,isAuthorized("admin"),fileUpload().single("poster"),validation(animeSchema.addAnime),animeController.addAnime);

// ^ update Anime
router.patch('/:id',isAuthenticated,isAuthorized("admin"),fileUpload().single("poster"),validation(animeSchema.updateAnime),animeController.updateAnime);

// ^ delete Anime
router.delete('/:id',isAuthenticated,isAuthorized("admin"),validation(animeSchema.deleteAnime),animeController.deleteAnime);

// ^ all animes
router.get('/',animeController.allAnimes);

// ^ spicific anime
router.get('/spicifcAnime',animeController.spicificAnimies);

// ^ add vidios
router.post('/:id',isAuthenticated,isAuthorized("admin"),fileUpload().fields([{name:"video",maxCount:1}]),validation(animeSchema.addVideo),animeController.addVideo);


export default router;