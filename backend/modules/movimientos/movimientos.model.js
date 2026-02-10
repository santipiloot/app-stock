import {db} from "../../config/database.js";

//Tabla movimientos = id, fecha,tipo_movimiento, usuario_id, observaciones

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

    createMovimiento: async (datos) => {
        
        const client = await db.connect();

        try {
            await client.query("BEGIN");

            const {tipo_movimiento, usuario_id, observaciones, detalles} = datos;

            const queryMov = `INSERT INTO movimientos (tipo_movimiento, usuario_id, observaciones) VALUES ($1, $2, $3) RETURNING id`;
            
            const resMov = await client.query(queryMov, [tipo_movimiento, usuario_id, observaciones]);
            const movimientoId = resMov.rows[0].id;

            for (const item of detalles){
                const {producto_id, cantidad} = items;

                const queryStock = `SELECT stock FROM productos WHERE id = $1 FOR UPDATE`;
                const resStock = await client.query(queryStock, [producto_id]);

                if (resStock.rows.length === 0) {
                    throw new Error(`Producto ${producto_id} no encontrado`)
                }

                const stockActual = resStock.rows[0].stock;
                let nuevoStock = 0;

                if(["INGRESO"].includes(tipo_movimiento)){
                    nuevoStock = stockActual + parseInt(cantidad);
                } else if (["SALIDA", "ROTURA"].includes(tipo_movimiento)){
                    nuevoStock = stockActual - parseInt(cantidad);

                    if (nuevoStock < 0){
                        throw new Error("Stock insuficiente para la operacion, checkear eso")
                    }
                }

                await client.query("UPDATE productos SET stock = $1 WHERE id = $2", [nuevoStock, producto_id]);

                const queryDetalle = `INSERT INTO movimiento_detalles (movimiento_id, producto_id, cantidad, stock_previo, stock_resultante) 
                VALUES ($1, $2, $3, $4, $5)`;

                await client.query(queryDetalle, [movimientoId, producto_id, cantidad, stockActual, nuevoStock]);
            }

            await client.query("COMMIT");
            return {success: true, message: "Movimiento registrado con exito", id: movimientoId};
        } catch(error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

}

export default Movimientos;