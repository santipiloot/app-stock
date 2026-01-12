import { param, validationResult } from "express-validator";

export const validarId = param("id").isInt({ min: 1 }).withMessage("ID no valido");

// Middleware verifaciones
export const verificarValidaciones = (req, res, next) => {
  const validacion = validationResult(req);
  // Para solo retornar los mensajes de error y manejarlos de una sola forma
  const mensajes = validacion.array().map((v) => v.msg)
  if (!validacion.isEmpty()) {
    return res.status(400).json({
      success: false,
      errores: mensajes,
    });
  }
  next();
};
