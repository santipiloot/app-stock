import express from "express";
import usuarioController from "./usuario.controller.js";
import { validarId, verificarValidaciones } from "../../middlewares/verificar-validaciones.js";
import { esAdmin } from "../../middlewares/rol.middleware.js"; //

const router = express.Router();

router.get("/", [esAdmin], usuarioController.getUsuarios);
router.get("/:id", [esAdmin, validarId, verificarValidaciones], usuarioController.getUsuario)

export default router