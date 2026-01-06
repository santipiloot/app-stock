import express from "express";
import usuarioController from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/", usuarioController.getUsuarios);

export default router