import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../usuarios/usuario.model.js"; 
import Rol from "../roles/rol.model.js";

const authController = {
    register: async (req, res) => {
        try {
            const { nombre, apellido, username, rol_id, activo, password } = req.body;

            const usuarioExistente = await Usuario.getUsuarioUsername(username);
            if (usuarioExistente) {
                return res.status(400).json({ success: false, message: "Ese username ya está registrado" });
            }

            const passwordHasheada = await bcrypt.hash(password, 12);

            
            const rolExistente = await Rol.getRol(rol_id);
            if (!rolExistente) return res.status(400).json({ success: false, message: "El rol ingresado no existe" });

            const nuevoUsuario = await Usuario.register(
                nombre, 
                apellido,
                username, 
                rol_id, 
                activo || true,
                passwordHasheada
            );

            const payload = { 
                id: nuevoUsuario.id, 
                username: nuevoUsuario.username,
                rol: rolExistente.nombre
            };

            const token = jwt.sign(
                payload, 
                process.env.JWT_SECRET, 
                { expiresIn: '8h' } // 
            );

            return res.status(201).json({
                success: true,
                message: "Usuario creado correctamente",
                token: token,
                user: {
                    id: nuevoUsuario.id,
                    username: nuevoUsuario.username,
                    nombre: nuevoUsuario.nombre
                }
            });

        } catch (error) {
            console.error("Error en auth controller:", error);
            return res.status(500).json({ 
                success: false, 
                errores: ["Error interno del servidor al registrar el usuario"] 
            });
        }
    }
};

export default authController;