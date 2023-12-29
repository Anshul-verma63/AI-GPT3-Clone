import express from "express";
import {
  userLoginController,
  userLogoutController,
  userRegisterController,
} from "../controllers/userController.js";

const router = express.Router();

//post register
router.post("/register", userRegisterController);

//login post
router.post("/login", userLoginController);

//logout post
router.post("/logout", userLogoutController);

export default router;
