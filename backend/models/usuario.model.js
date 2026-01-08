import { db } from "../database.js";

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
    }
}

export default Usuario