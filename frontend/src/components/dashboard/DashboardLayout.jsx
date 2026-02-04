import TablaPedidos from "./pedidos/TablaPedidos"

//Hacer visualizar ventas, hacer pedido | visualizar pedidos y cambiar estado de pedidos (modificar stock), vista de alertas, 

function DashboardLayout() {
  return (
    <div>
      <h1>Pedidos</h1>
      <TablaPedidos/>
    </div>
  )
}

export default DashboardLayout