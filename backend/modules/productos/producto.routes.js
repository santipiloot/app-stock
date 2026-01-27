import express from "express";
import { validarId, verificarValidaciones } from "../../middlewares/verificar-validaciones.js";
import productoController from "./producto.controller.js";
import { esAdmin } from "../../middlewares/rol.middleware.js"

const router = express.Router();

router.get("/", productoController.getProductos);
router.get("/stock-critico", productoController.getBajoStock);
router.get("/inactivos", productoController.getProductosInactivos);
router.post("/", [esAdmin], productoController.create)
router.get("/codigo/:codigo", productoController.getProductoCodigo);

router.get("/:id", [validarId, verificarValidaciones], productoController.getProducto);
router.patch("/stock/:id", [validarId, verificarValidaciones], productoController.updateStock);
router.patch("/:id", [validarId, verificarValidaciones], productoController.updateFull);

export default router;
