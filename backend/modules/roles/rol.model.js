import { db } from "../../config/database.js";

const Rol = {
    getRol: async (rol_id) => {
        try {
            const res = await db.query("SELECT * FROM roles WHERE id=$1", [rol_id])
            return res.rows[0]
        } catch (error) {
            console.error("Error en la base de datos con getRol:", error)
            throw error;
        }
    }
}

export default Rol