import { db } from "../../config/database.js";

const Usuario = {
    getUsuarios: async () => {
        try {
            const res = await db.query("SELECT id, nombre, apellido, username, activo, rol_id FROM usuarios ORDER BY id ASC");

            return res.rows;
        } catch (error) {
            console.error("Error en la base de datos con getUsuarios:", error);
            throw error;
        }
    },
    getUsuario: async (id) => {
        try {
            const res = await db.query(
                "SELECT id, nombre, apellido, username, activo, rol_id FROM usuarios WHERE id=$1", [id]);

            return res.rows[0]
        } catch (error) {
            console.error("Error en la base de datos con getUsuario:", error);
            throw error;
        }
    }, 
    getUsuarioUsername: async (username) => {
        try {
            const res = await db.query(
                "SELECT * FROM usuarios WHERE username=$1", [username]);

            return res.rows[0]
        } catch (error) {
            console.error("Error en la base de datos con getUsuarioUsername:", error);
            throw error;
        }
    }, 
    register: async (nombre, apellido, username, rol_id, activo, password_hash) => {
        try {
            const res = await db.query("INSERT INTO usuarios (nombre, apellido, username, rol_id, activo, password_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nombre, apellido, username, rol_id, activo,  password_hash])

            return res.rows[0];

        } catch(error){
            console.error("Error en la base de datos con register:", error);
            throw error;
        }
    },
    updateStatus: async (id, activo) => {
        try {
            const res = await db.query(
                "UPDATE usuarios SET activo = $1 WHERE id = $2 RETURNING id, username, activo",
                [activo, id]
            );
            return res.rows[0];
        } catch (error) {
            console.error("Error en la base de datos con updateStatus:", error);
            throw error;
        }
    },
    updatePassword: async (id, password_hash) => {
        try {
            const res = await db.query(
                "UPDATE usuarios SET password_hash = $1 WHERE id = $2 RETURNING id, username",
                [password_hash, id]
            );
            return res.rows[0];
        } catch (error) {
            console.error("Error en la base de datos con updatePassword:", error);
            throw error;
        }
    }, 
    updateRol: async (id, rol_id) => {
    try {
        const res = await db.query(
            "UPDATE usuarios SET rol_id = $1 WHERE id = $2 RETURNING id, username, rol_id",
            [rol_id, id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error en la base de datos con updateRol:", error);
        throw error;
    }
}
}

export default Usuario