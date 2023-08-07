import { register, login, verifyEmail } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify-email").post(verifyEmail);

export default router;
