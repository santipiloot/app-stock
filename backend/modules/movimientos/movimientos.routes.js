import express from "express";
import { validarId, verificarValidaciones } from "../../middlewares/verificar-validaciones.js";
import movimientoController from "./movimientos.controller.js";
// import { esAdmin } from "../../middlewares/rol.middleware.js";

const router = express.Router();

router.get("/", movimientoController.getMovimientos);
router.get("/:id", [validarId, verificarValidaciones], movimientoController.getMovimiento);
router.post("/crear", movimientoController.createMovimiento);

export default router;