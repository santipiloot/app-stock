import express from "express";
import Proveedor from "./proveedores.controller.js";
import { validarId, verificarValidaciones } from "../../middlewares/verificar-validaciones.js";
import proveedoresController from "./proveedores.controller.js";

const router = express.Router();

router.get("/", proveedoresController.getProveedores);
router.get("/:id", [validarId, verificarValidaciones], proveedoresController.getProveedor);
router.post("/", proveedoresController.postProveedor);
router.put("/:id/modificar", [validarId, verificarValidaciones], proveedoresController.putProveedor);
router.delete("/:id", [validarId, verificarValidaciones], proveedoresController.deleteProveedor);

export default router;
