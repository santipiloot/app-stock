import Usuario from "../models/usuario.model.js";

const usuarioController = {
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.getUsuarios();
            res.status(200).json({ success: true, data: usuarios })

        } catch (error) {
            console.error("Error en el controlador de getUsuarios:", error);
            res.status(500).json({ success: false, errores: ["Error al obtener los usuarios"] });
        }
    }
}

export default usuarioController;