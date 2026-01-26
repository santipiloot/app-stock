import { db } from "../../config/database.js"

const Producto = {
    getProductos: async () => {
        const query = `
            SELECT p.*, c.nombre AS categoria_nombre, prov.nombre AS proveedor_nombre
            FROM productos p
            INNER JOIN categorias c ON p.categoria_id = c.id
            INNER JOIN proveedores prov ON p.proveedor_id = prov.id
            WHERE p.activo = true
            ORDER BY p.id DESC
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    getProductosInactivos: async () => {
        const query = `
        SELECT p.*, c.nombre AS categoria_nombre, prov.nombre AS proveedor_nombre
        FROM productos p
        INNER JOIN categorias c ON p.categoria_id = c.id
        INNER JOIN proveedores prov ON p.proveedor_id = prov.id
        WHERE p.activo = false
        ORDER BY p.id DESC
    `;
        const { rows } = await db.query(query);
        return rows;
    },
    getProducto: async (id) => {
        const query = `
            SELECT p.*, c.nombre AS categoria_nombre, prov.nombre AS proveedor_nombre
            FROM productos p
            INNER JOIN categorias c ON p.categoria_id = c.id
            INNER JOIN proveedores prov ON p.proveedor_id = prov.id
            WHERE p.id = $1
        `;
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    getProductoCodigo: async (codigo) => {
        const query = `
            SELECT p.*, c.nombre AS categoria_nombre, prov.nombre AS proveedor_nombre
            FROM productos p
            INNER JOIN categorias c ON p.categoria_id = c.id
            INNER JOIN proveedores prov ON p.proveedor_id = prov.id
            WHERE p.codigo_barra = $1 AND p.activo = true
        `;
        const { rows } = await db.query(query, [codigo]);
        return rows[0];
    },
    create: async (datos) => {
        const { nombre, descripcion, codigo_barra, categoria_id, stock, stock_critico, precio, proveedor_id } = datos;

        const query = `
        INSERT INTO productos (nombre, descripcion, codigo_barra, categoria_id, stock, stock_critico, precio, proveedor_id, activo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true) RETURNING * `;

        const values = [
            nombre, descripcion, codigo_barra, categoria_id,
            stock, stock_critico, precio, proveedor_id
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    },
    updateStock: async (id, nuevoStock) => {
        const query = `UPDATE productos SET stock = $1 WHERE id = $2 RETURNING *`;
        const { rows } = await db.query(query, [nuevoStock, id]);
        return rows[0];
    },
    getBajoStock: async () => {
        const query = `SELECT p.*, c.nombre AS categoria_nombre, prov.nombre AS proveedor_nombre
        FROM productos p
        INNER JOIN categorias c ON p.categoria_id = c.id
        INNER JOIN proveedores prov ON p.proveedor_id = prov.id
        WHERE p.stock <= p.stock_critico AND p.activo = true
        ORDER BY p.stock ASC
    `;
        const { rows } = await db.query(query);
        return rows;
    },
    updateFull: async (id, datos) => {

        const {nombre, descripcion, codigo_barra, categoria_id,
            stock, stock_critico, precio, proveedor_id, activo } = datos

        const query = ` UPDATE productos SET nombre = $1, descripcion = $2, codigo_barra = $3, 
        categoria_id = $4, stock = $5, stock_critico = $6, 
        precio = $7, proveedor_id = $8, activo = $9
        WHERE id = $10 
        RETURNING *
    `;

        const values = [
            nombre, descripcion, codigo_barra, categoria_id,
            stock, stock_critico, precio, proveedor_id, activo, id
        ];

        const { rows } = await db.query(query, values);
        return rows[0];
    }
};

export default Producto;