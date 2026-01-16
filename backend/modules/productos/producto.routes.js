import express from "express";
import { validarId, verificarValidaciones } from "../../middlewares/verificar-validaciones.js";
import productoController from "./producto.controller.js";
import { esAdmin } from "../../middlewares/rol.middleware.js"

const router = express.Router();

router.get("/", productoController.getProductos);
router.get("/inactivos", productoController.getProductosInactivos);
router.get("/:id", [validarId, verificarValidaciones], productoController.getProducto);
router.get("/codigo/:codigo", productoController.getProductoCodigo);
router.post("/", [esAdmin], productoController.create)

export default router;
