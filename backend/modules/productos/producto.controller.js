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
    getProductosInactivos: async (req, res) => {
        try {
            const productos = await Producto.getProductosInactivos();
            res.status(200).json({
                success: true,
                data: productos
            });
        } catch (error) {
            console.error("Error en getProductosInactivos:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor al obtener productos inactivos"
            });
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
    },
    create: async (req, res) => {
        try {
            const nuevoProducto = await Producto.create(req.body);
            res.status(201).json({
                success: true,
                message: "Producto creado exitosamente",
                data: nuevoProducto
            });
        } catch (error) {
            console.error("Error en create producto:", error);

            if (error.code === '23505') {
                return res.status(400).json({
                    success: false,
                    message: "Ya existe un producto con ese código de barras"
                });
            }

            res.status(500).json({
                success: false,
                message: "Error interno del servidor al crear el producto"
            });
        }
    },
    updateStock: async (req, res) => {
        try {
            const { id } = req.params;
            const { stock } = req.body;

            const productoActualizado = await Producto.updateStock(id, stock);

            if (!productoActualizado) {
                return res.status(404).json({
                    success: false,
                    message: "Producto no encontrado"
                });
            }

            res.status(200).json({
                success: true,
                message: "Stock actualizado correctamente",
                data: productoActualizado
            });
        } catch (error) {
            console.error("Error en updateStock:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor al actualizar el stock"
            });
        }
    },
    getBajoStock: async (req, res) => {
        try {
            const productos = await Producto.getBajoStock();
            res.status(200).json({
                success: true,
                data: productos
            });
        } catch (error) {
            console.error("Error en getBajoStock:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor al obtener productos con bajo stock"
            });
        }
    },

    updateFull: async (req, res) => {
        try {
            const { id } = req.params;

            const productoEditado = await Producto.updateFull(id, req.body);

            if (!productoEditado) {
                return res.status(404).json({ success: false, message: "Producto no encontrado" });
            }

            res.status(200).json({
                success: true,
                message: "Producto actualizado correctamente por el administrador",
                data: productoEditado
            });
        } catch (error) {
            console.error("Error en updateFull:", error);

            if (error.code === '23505') {
                return res.status(400).json({
                    success: false,
                    message: "Ya existe otro producto con ese mismo código de barras"
                });
            }

            res.status(500).json({
                success: false,
                message: "Error interno del servidor al modificar el producto"
            });
        }
    }
};

export default productoController;