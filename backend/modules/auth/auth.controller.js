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

            if (!usuario.activo) {
                return res.status(403).json({ success: false, message: "Cuenta desactivada" });
            }

            const esIgual = await bcrypt.compare(password, usuario.password_hash);
            if (!esIgual) {
                return res.status(401).json({ success: false, message: "Credenciales invalidas" });
            }

            const rol = await Rol.getRol(usuario.rol_id);
            const payload = { id: usuario.id, username: usuario.username, rol: rol.nombre };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

            return res.status(200).json({
                success: true,
                data: {
                    token,
                    user: { id: usuario.id, username: usuario.username, nombre: usuario.nombre, rol: rol.nombre }
                }
            });
        } catch (error) {
            console.error("Error en login:", error);
            return res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
    },

    getMe: async (req, res) => {
        try {
            const usuario = await Usuario.getUsuario(req.user.id);
            res.status(200).json({ success: true, data: usuario });
        } catch (error) {
            console.error("Error en getMe:", error)
            res.status(500).json({ success: false, message: "Error al obtener perfil" });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { id } = req.params;
            const { nuevaPassword } = req.body;

            const passwordHasheada = await bcrypt.hash(nuevaPassword, 12);
            await Usuario.updatePassword(id, passwordHasheada);

            res.status(200).json({ success: true, message: "Contraseña actualizada por el administrador" });
        } catch (error) {
            console.error("Error en resetPassword:", error)
            res.status(500).json({ success: false, message: "Error al resetear contraseña" });
        }
    },

    toggleStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { activo } = req.body;

            const usuarioActualizado = await Usuario.updateStatus(id, activo);
            res.status(200).json({
                success: true,
                message: `Usuario ${activo ? 'activado' : 'desactivado'} correctamente`,
                data: usuarioActualizado
            });
        } catch (error) {
            console.error("Error en toggleStatus:", error)
            res.status(500).json({ success: false, message: "Error al cambiar estado del usuario" });
        }
    },

    changeRol: async (req, res) => {
        try {
            const { id } = req.params;
            const { rol_id } = req.body;

            const rolExistente = await Rol.getRol(rol_id);
            if (!rolExistente) {
                return res.status(400).json({ success: false, message: "El rol especificado no existe" });
            }

            const usuarioActualizado = await Usuario.updateRol(id, rol_id);

            if (!usuarioActualizado) {
                return res.status(404).json({ success: false, message: "Usuario no encontrado" });
            }

            res.status(200).json({
                success: true,
                message: "Rol de usuario actualizado correctamente",
                data: usuarioActualizado
            });
        } catch (error) {
            console.error("Error en changeRol:", error)
            res.status(500).json({ success: false, message: "Error al actualizar el rol" });
        }
    },

    updateMyPassword: async (req, res) => {
        try {
            const { passwordActual, nuevaPassword } = req.body;
            const usuarioId = req.user.id;

            const usuario = await Usuario.getUsuarioUsername(req.user.username);

            const esValida = await bcrypt.compare(passwordActual, usuario.password_hash);
            if (!esValida) {
                return res.status(401).json({ success: false, message: "La contraseña actual no es correcta" });
            }

            const nuevoHash = await bcrypt.hash(nuevaPassword, 12);
            await Usuario.updatePassword(usuarioId, nuevoHash);

            res.status(200).json({ success: true, message: "Contraseña actualizada con exito" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error al actualizar la contraseña" });
        }
    },

    register: async (req, res) => {
        try {
            const { nombre, apellido, username, rol_id, activo, password } = req.body;

            const usuarioExistente = await Usuario.getUsuarioUsername(username);
            if (usuarioExistente) {
                return res.status(400).json({ success: false, message: "Ese username ya esta registrado" });
            }

            const passwordHasheada = await bcrypt.hash(password, 12);
            const rolExistente = await Rol.getRol(rol_id);
            if (!rolExistente) return res.status(400).json({ success: false, message: "El rol ingresado no existe" });

            const nuevoUsuario = await Usuario.register(
                nombre, apellido, username, rol_id, activo ?? true, passwordHasheada
            );

            return res.status(201).json({
                success: true,
                message: "Usuario creado correctamente",
                data: { id: nuevoUsuario.id, username: nuevoUsuario.username, nombre: nuevoUsuario.nombre }
            });
        } catch (error) {
            console.error("Error en register:", error);
            res.status(500).json({ success: false, message: "Error al registrar usuario" });
        }
    }
};

export default authController;