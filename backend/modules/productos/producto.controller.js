import Producto from "./producto.model.js";

const productoController = {
    getProductos: async (req, res) => {
        try {
            const productos = await Producto.getProductos();
            res.status(200).json({
                success: true,
                data: productos
            });
        } catch (error) {
            console.error("Error en getProductos:", error);
            res.status(500).json({ success: false, message: "Error interno del servidor al obtener productos" });
        }
    },

    getProducto: async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await Producto.getProducto(id);

            if (!producto) {
                return res.status(404).json({ success: false, message: "Producto no encontrado" });
            }

            res.status(200).json({ success: true, data: producto });
        } catch (error) {
            console.error("Error en getProducto:", error)
            res.status(500).json({ success: false, message: "Error interno del servidor al obtener el producto" });
        }
    },

    getProductoCodigo: async (req, res) => {
        try {
            const { codigo } = req.params;
            const producto = await Producto.getProductoCodigo(codigo);

            if (!producto) {
                return res.status(404).json({ 
                    success: false, 
                    message: "El codigo no existe en la base de datos" 
                });
            }

            res.status(200).json({ success: true, data: producto });
        } catch (error) {
            console.error("error en getProductoCodigo:", error)
            res.status(500).json({ success: false, message: "Error interno del servidor al escanear producto" });
        }
    }
};

export default productoController;