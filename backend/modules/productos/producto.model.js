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
    }
};

export default Producto;