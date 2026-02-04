import { db } from "../../config/database.js";

//Tabla pedidos = id, proveedor_id, usuario_id, fecha_pedido, esstado, precio_total

//Tabla pedido_detalle = id, pedido_id, producto_id, cantidad, precio

//Tabla proveedores = id, nombre, telefono, activo

//Tabla productos = id, nombre, descripcion, codigo_barra, categoria_id, stock, stock_critico, precio, proveedor_id, activo

const Pedido = {

    getPedidos: async () => {
        const query = `SELECT 
        pedido.id,
        pedido.fecha_pedido,
        pedido.estado,
        pedido.precio_total,
        proveedores.nombre AS proveedor_nombre,
        usuarios.nombre AS usuario_nombre
        FROM pedido
        INNER JOIN proveedores ON pedido.proveedor_id = proveedores.id
        INNER JOIN usuarios ON pedido.usuario_id = usuarios.id
        ORDER BY pedido.id DESC;`;

        const { rows} = await db.query(query);
        return rows;
    },

    getPedido: async (id) => {

        const query = `SELECT
        pd.id, 
        pd.pedido_id, 
        pd.cantidad, 
        pd.precio, 
        p.nombre AS producto_nombre 
        FROM pedido_detalle pd 
        INNER JOIN productos p ON pd.producto_id = p.id
        WHERE pd.pedido_id = $1;`;

        const { rows} = await db.query(query, [id]);
        return rows;

    },

    createPedido: async (datos) => {

        const client = await db.connect();

        try {
            
            await client.query("BEGIN");

            const {proveedor_id, usuario_id, fecha_pedido, precio_total, detalles } = datos;

            const queryPedido = `INSERT INTO pedido (proveedor_id, usuario_id, fecha_pedido, estado, precio_total)
            VALUES ($1, $2, $3, 'Pendiente', $4) RETURNING id`;

            const resPedido = await client.query(queryPedido, [proveedor_id, usuario_id, fecha_pedido, precio_total]);
            const pedidoId = resPedido.rows[0].id;

            for (const detalle of detalles) {
                const queryDetalle = `INSERT INTO pedido_detalle (pedido_id, producto_id, cantidad, precio) VALUES ($1, $2, $3, $4)`;

                await client.query(queryDetalle, [pedidoId, detalle.producto_id, detalle.cantidad, detalle.precio_unitario]);
            }

            await client.query("COMMIT");

            return {success: true, message: "Pedido creado", id: pedidoId};


        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }

    },

    entregarPedido: async (id) => {

        try {

            const queryPedido = "UPDATE pedido SET estado = 'Entregado' WHERE id = $1 RETURNING * ";
            const resPedido = await db.query(queryPedido, [id]);

            if (resPedido.rows.length === 0){
                throw new Error("Pedido no encontrado");
            }

            const queryDetalle = "SELECT * FROM pedido_detalle WHERE pedido_id = $1";
            const resDetalles = await db.query(queryDetalle, [id]);
            const detalles = resDetalles.rows;

            for (const detalle of detalles) {
                const queryProducto = await "UPDATE productos SET stock = stock + $1 WHERE id = $2";
                await db.query(queryProducto, [detalle.cantidad, detalle.producto_id]);
            }

            return {sucess: true, messagge: "Stock modificado | Pedido entregado"}

        } catch (err) {
            throw err;
        }
    
    },

    cancelarPedido: async (id) => {

        const query = "UPDATE pedido SET estado = 'Cancelado' WHERE id = $1";

        const { rows } = await db.query(query, [id]);

    },


}

export default Pedido;