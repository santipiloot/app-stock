import Usuario from "./usuario.model.js";

const usuarioController = {
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.getUsuarios();
            res.status(200).json({ success: true, data: usuarios })

        } catch (error) {
            console.error("Error en el controlador de getUsuarios:", error);
            res.status(500).json({ success: false, errores: ["Error al obtener los usuarios"] });
        }
    },
    getUsuario: async (req, res) => {
        try {
            const id = Number(req.params.id);

            const usuario = await Usuario.getUsuario(id);

            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    errores: ["Usuario no encontrado"]
                });
            }

            res.status(200).json({ success: true, data: usuario })

        } catch (error) {
            console.error("Error en el controlador de getUsuario:", error);
            res.status(500).json({ success: false, errores: ["Error al obtener el usuario"] });
        }
    }
}

export default usuarioController;