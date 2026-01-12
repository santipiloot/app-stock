import express from "express";
import usuarioController from "./usuario.controller.js";
import { validarId, verificarValidaciones } from "../../middlewares/verificar-validaciones.js";

const router = express.Router();

router.get("/", usuarioController.getUsuarios);
router.get("/:id", [validarId, verificarValidaciones], usuarioController.getUsuario)

export default router