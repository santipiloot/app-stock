import express from "express";
import authController from "./auth.controller.js";
import { verificarAutenticacion } from "../../config/auth.js";
import { verificarValidaciones, validarId } from "../../middlewares/verificar-validaciones.js";
import { esAdmin } from "../../middlewares/rol.middleware.js";

const router = express.Router();

// Publicas
router.post("/login", authController.login);

// Privadas
router.get("/me", verificarAutenticacion, authController.getMe);

router.post("/register", [verificarAutenticacion, esAdmin, authController.register]);

router.patch("/status/:id", [verificarAutenticacion, esAdmin, validarId, verificarValidaciones],authController.toggleStatus);

router.patch("/my-password", [verificarAutenticacion], authController.updateMyPassword);

router.patch("/reset-password/:id", [verificarAutenticacion, esAdmin, validarId,verificarValidaciones], authController.resetPassword);

router.patch("/change-role/:id", [verificarAutenticacion, esAdmin, validarId, verificarValidaciones],authController.changeRol);

export default router