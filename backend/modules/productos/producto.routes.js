import express from "express";
import { validarId, verificarValidaciones } from "../../middlewares/verificar-validaciones.js";
import productoController from "./producto.controller.js";

const router = express.Router();

router.get("/", productoController.getProductos);
router.get("/:id", [validarId], productoController.getProducto);
router.get("/codigo/:codigo", productoController.getProductoCodigo);

export default router;
