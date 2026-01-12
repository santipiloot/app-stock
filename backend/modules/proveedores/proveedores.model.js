import {db} from "../../config/database.js"

const Proveedor = {

    getProveedores: async () => {
        try {
            const res = await db.query("SELECT * FROM proveedores");

            return res.rows;
        } catch (error) {
            console.error("Error en la base de datos con getProveedores: ", error);
            throw error;
        }
    }, 
    getProveedor: async (id) => {
        try {
            const res = await db.query("SELECT * FROM proveedores WHERE id=$1", [id]);

            return res.rows[0];
        } catch (error) {
            console.error("Error en la base de datos con getProveedor: ", error);
            throw error;
        }
    }, 
    postProveedor: async (nombre, telefono, activo) => {
        try {
            const res = await db.query("INSERT INTO proveedores (nombre, telefono, activo) VALUES ($1, $2, $3) RETURNING *", [nombre, telefono, activo]);

            return res.rows[0];
        } catch(error){
            console.error("Error en la base de datos con postProveedor: ", error);
            throw error;
        }
    }, 
    putProveedor: async (id, nombre, telefono, activo) => {
        try {
            const res = await db.query("UPDATE proveedores SET nombre=$1, telefono=$2, activo=$3 WHERE id=$4 RETURNING *", [nombre, telefono, activo, id])
        } catch(error){
            console.error("Error en la base de datos con putProveedor: ", error);
            throw error;
        }
    },
    deleteProveedor: async (id) => {
        try {
            const res = await db.query("DELETE FROM proveedores WHERE id=$1", [id]);
            return res.rows[0];
        } catch(error){
            console.error("Error en la base de datos con deleteProveedor: ", error);
            throw error;
        }
        }
    }

export default Proveedor;
