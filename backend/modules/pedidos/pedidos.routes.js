import express from "express";
import { validarId, verificarValidaciones } from "../../middlewares/verificar-validaciones";
import pedidoController from "./pedidos.controller";
import { esAdmin } from "../../middlewares/rol.middleware";

const router = express.Router();

router.get("/", pedidoController.getPedido);
router.get("/:id",[validarId, verificarValidaciones], pedidoController.getPedido);
router.post("/crear",[esAdmin], pedidoController.createPedido);
router.patch("/entregar/:id", [validarId, verificarValidaciones], pedidoController.entregarPedido);
router.delete("/cancelar/:id", [validarId, verificarValidaciones], pedidoController.cancelarPedido);

export default router;