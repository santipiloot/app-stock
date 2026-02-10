import {db} from "../../config/database.js";

//Tabla movimientos = id, fecha,tipo_movimiento, usuario_id, observacion

//Tabla movimiento_detalles = id, movimiento_id, producto_id, cantidad, stock_previo, stock_resultante

const Movimientos = {
    getMovimientos: async () => {
        const query = 'SELECT m.id, m.fecha, m.tipo_movimiento, u.nombre as usuario, m.observacion, COUNT (md.id) as cantidad_items FROM movimientos m LEFT JOIN usuarios u ON m.usuario_id = u.id LEFT JOIN movimiento_detalles md ON m.id = md.movimiento_id GROUP BY m.id, m.fecha, m.tipo_movimiento, u.nombre, m.observacion ORDER BY m.fecha DESC';

        const {rows} = await db.query(query);
        return rows;
    },

    getMovimiento: async (id) => {
        const query = "SELECT md.id, md.movimiento_id, md.producto_id, md.cantidad, md.stock_previo, md.stock_resultante, p.nombre producto_nombre FROM movimiento_detalles md INNER JOIN productos p ON md.producto_id = p.id WHERE md.movimiento_id = $1";

        const {rows} = await db.query(query, [id]);
        return rows;
    },

    
}