import Movimientos from "./movimientos.model.js";

const movimientoController = {
    getMovimientos: async (req, res) => {
        try {
            const movimientos = await Movimientos.getMovimientos();
            res.status(200).json({
                success: true,
                data: movimientos
            });
        } catch (err) {
            console.error("Error en getMovimientos: ", err);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor al obtener movimientos"
            });
        }
    },
    getMovimiento: async (req, res) => {
        try {
            const {id} = req.params;
            const movimiento = await Movimientos.getMovimiento(id);
            res.status(200).json({
                success: true,
                data: movimiento
            });
        } catch (err) {
            console.error("Error en getMovimiento: ", err);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor al obtener el movimiento"
            });
        }
    },
    createMovimiento: async (req, res) => {
        try {
            const nuevoMovimiento = await Movimientos.createMovimiento(req.body);
            res.status(201).json({
                success: true,
                message: "Movimiento creado exitosamente",
                data: nuevoMovimiento
            });
        } catch (err) {
            console.error("Error en createMovimiento: ", err);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor al crear el movimiento"
            });
        }
    }
}