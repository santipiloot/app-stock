import express from "express";
import { validarId, verificarValidaciones } from "../../middlewares/verificar-validaciones.js";
import pedidoController from "./pedidos.controller.js";
import { esAdmin } from "../../middlewares/rol.middleware.js";

const router = express.Router();

router.get("/", pedidoController.getPedidos);
router.get("/:id",[validarId, verificarValidaciones], pedidoController.getPedido);
router.post("/crear", pedidoController.createPedido);
router.patch("/entregar/:id", [validarId, verificarValidaciones], pedidoController.entregarPedido);
router.delete("/cancelar/:id", [validarId, verificarValidaciones], pedidoController.cancelarPedido);

export default router;