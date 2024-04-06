import { Router } from "express";
import {isAuthenticated} from '../../middleware/authuntication.middleware.js'
import {isAuthorized} from '../../middleware/authorization.middleware.js'
import { validation } from "../../middleware/validation.middleware.js";
import * as authSchema from "./auth.schema.js"
import * as authController from "./auth.controller.js"
import {fileUpload} from '../../utils/fileUpload.js'
const router=Router();

// ^ signup
router.post('/signup',validation(authSchema.signup),authController.signup)

// ^ activate account
router.get('/active_account/:token',validation(authSchema.activateAccount),authController.activateAccount)

// ^ login 
router.post('/login',validation(authSchema.login),authController.login)
// ^ update password 
router.patch("/updatePassword",isAuthenticated,isAuthorized("user","admin"),validation(authSchema.updatePasswordSchema),authController.updatePassword)

// ^ forget code
router.patch("/forgetCode",validation(authSchema.forgetCode),authController.forgetCode)

// ^ reset password
router.patch("/resetpassword",validation(authSchema.resetPassword),authController.resetPassword)

// ^ upload avatar
router.post('/avatar',isAuthenticated,isAuthorized("user","admin"),fileUpload().single('avatar'),authController.uploadAvatar)

// ^ get avatar
router.get('/showAvatar',isAuthenticated,isAuthorized("user","admin"),authController.showAvatar);

// ^ update user data
router.patch("/",isAuthenticated,isAuthorized("admin","user"),validation(authSchema.userDataSchema),authController.userData)
export default router;