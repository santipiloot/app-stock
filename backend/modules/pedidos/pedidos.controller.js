import Pedido from "./pedidos.model.js";

const pedidoController = {
    getPedidos: async (req, res) => {
        try {
            const pedidos = await Pedido.getPedidos();
            res.status(200).json({
                success: true,
                data: pedidos
            });

        } catch(err){
            console.error("Error en getPedidos: ", err);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor al obtener pedidos"
            });
        }
    },
    getPedido: async (req, res) => {
        try {
            const {id} = req.params;
            const pedido = await Pedido.getPedido(id);
            res.status(200).json({
                success: true, 
                data: pedido
            });
        } catch (err){
            console.error("Error en el getPedido: ", err);
            res.status(500).json({success: false, message: "Error interno del servidor al obtener el pedido"});
        }
    },
    createPedido: async (req, res) => {
        try {
            const nuevoPedido = await Pedido.createPedido(req.body);
            res.status(201).json({
                success: true,
                message: "Pedido creado exitosamente",
                data: nuevoPedido
            });
        } catch (err) {
            console.error("Error en createPedido: ", err);
            res.status(500).json({
                success: false, 
                message: "Error interno del servidor al crear el pedido"
            });
        }
    },
    entregarPedido: async (req, res) => {
        try{
            const {id} = req.params;
            const pedido = await Pedido.entregarPedido(id);
            res.status(200).json({
                sucess: true,
                message: "Pedido creado exisotamente",
                data: pedido
            });
        } catch (err) {
            console.error("Error en entregarPedido: ", err);
            res.status(500).json({
                success: false, 
                message: "Error interno del servidor al entregar el pedido"
            });
        }
    },
    cancelarPedido: async (req, res) => {
        try {
            const {id} = req.params;
            const pedido = await Pedido.cancelarPedido(id);
            res.status(200).json({
                success: true,
                message: "Pedido cancelado",
                data: pedido
            });

        } catch (err){
            console.error("Error en el cancelarPedido: ", err);
            res.status(500).json({success: false, message: "Error interno en el servidor al cancelar pedido"});
        }
    }
}
