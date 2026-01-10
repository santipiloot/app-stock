import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../usuarios/usuario.model.js";
import Rol from "../roles/rol.model.js";

const authController = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const usuario = await Usuario.getUsuarioUsername(username);
            if (!usuario) {
                return res.status(401).json({ success: false, message: "Credenciales invalidas" });
            }

            const esIgual = await bcrypt.compare(password, usuario.password_hash);
            if (!esIgual) {
                return res.status(401).json({ success: false, message: "Credenciales invalidas" });
            }

            const rol = await Rol.getRol(usuario.rol_id);

            const payload = {
                id: usuario.id,
                username: usuario.username,
                rol: rol.nombre
            };

            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            return res.status(200).json({
                success: true,
                data: {
                    token: token,
                    user: { id: usuario.id, username: usuario.username, nombre: usuario.nombre }
                }
            });

        } catch (error) {
            console.error("Error en login:", error);
            return res.status(500).json({ success: false, message: "Error interno del servidor al loguear el usuario" });
        }
    },

    register: async (req, res) => {
        try {
            if (!req.user || req.user.rol !== 'administrador') {
                return res.status(403).json({
                    success: false,
                    message: "No tienes permisos de administrador para realizar esta acción"
                });
            }

            const { nombre, apellido, username, rol_id, activo, password } = req.body;

            const usuarioExistente = await Usuario.getUsuarioUsername(username);
            if (usuarioExistente) {
                return res.status(400).json({ success: false, message: "Ese username ya esta registrado" });
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

            return res.status(201).json({
                success: true,
                message: "Usuario creado correctamente",
                data: {
                    id: nuevoUsuario.id,
                    username: nuevoUsuario.username,
                    nombre: nuevoUsuario.nombre
                }
            });

        } catch (error) {
            console.error("Error en register:", error);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor al registrar el usuario"
            });
        }
    }
};

export default authController;