import express from "express";
import authController from "./auth.controller.js";
import { verificarAutenticacion } from "../../config/auth.js";

const router = express.Router();

router.post("/login", authController.login);

router.post("/register", [verificarAutenticacion, authController.register]);

export default router