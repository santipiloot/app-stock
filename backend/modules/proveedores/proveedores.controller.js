import Proveedor from "./proveedores.model.js";

const proveedoresController = {
    getProveedores: async (req, res) => {
        try {
            const proveedores = await Proveedor.getProveedores();
            res.status(200).json({success: true, data: proveedores})
        } catch(error){
            console.error("Error en el controlador de getProveedores: ", error);
            res.status(500).json({success: false, message: "Error interno del servidor al obtener los proveedores"});
        }
    },
    getProveedor: async (req, res) => {
        try {
            const id = Number(req.params.id);

            const proveedor = await Proveedor.getProveedor(id);

            if (!proveedor){
                return res.status(404).json({success: false, message: "Proveedor no encontrado"});
            }  

            res.status(200).json({success: true, data: proveedor})
        } catch(error){
            console.error("Error en el controlador de getProveedor: ", error);
            res.status(500).json({success: false, message: "Error interno del servidor al obtener el proveedor"});
        }
    },
    postProveedor: async (req, res) => {
        try {
            const {nombre, telefono, activo} = req.body;

            const nuevoProveedor = await Proveedor.postProveedor(nombre, telefono, activo);

            res.status(201).json({success: true, data: nuevoProveedor});

        } catch(error){
            console.error("Error en el controlador de postProveedor: ", error);
            res.status(500).json({success: false, message: "Error interno del servidor al crear el proveedor"});
        }
    },
    putProveedor: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const {nombre, telefono, activo} = req.body;

            const proveedorActualizado = await Proveedor.putProveedor(id, nombre, telefono, activo);
            
            res.status(200).json({success: true, data: proveedorActualizado});

        } catch(error){
            console.error("Error en el controlador de putProveedor: ", error);
            res.status(500).json({success: false, message: "Error interno del servidor al actualizar el proveedor"});
        }
    },
    deleteProveedor: async (req, res) => {
        try {
            const id = Number(req.params.id);

            const proveedorEliminado = await Proveedor.deleteProveedor(id);

            res.status(200).json({success: true, data: proveedorEliminado});

        } catch(error){
            console.error("Error en el controlador de deleteProveedor: ", error);
            res.status(500).json({success: false, message: "Error interno del servidor al eliminar el proveedor"});
        }
    }

}

export default proveedoresController;