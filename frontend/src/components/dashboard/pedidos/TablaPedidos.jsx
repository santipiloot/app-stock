import { Link } from "react-router"
import { useEffect, useState } from "react"
import { useCallback } from "react"

function TablaPedidos() {

    const handleCancelar = async (id) => {
        //Si
    }

    const [pedidos, setPedidos] = useState([]);

    const fetchPedidos = useCallback(
        async () => {
            const response = await fetch("http://localhost:3000/pedidos");
            const data = await response.json();

            if (!response.ok){
                console.log("Hubo un error: ", data.error);
                return;
            }

            console.log("Pedidos: ", data);

            setPedidos(data.data);
        }
    )

    useEffect(() => {
    fetchPedidos();
    }, []);
    

  return (
    <div>
        <Link className='btn btn-success' role='button' to={"/pedidos/crear"}>Agregar pedido</Link>
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Fecha del pedido</th>
                    <th scope='col'>Estado</th>
                    <th scope='col'>Precio total</th>
                    <th scope='col'>Proveedor</th>
                    <th scope='col'>Usuario</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {pedidos.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.fecha_pedido}</td>
                        <td>{p.estado}</td>
                        <td>{p.precio_total}</td>
                        <td>{p.proveedor_nombre}</td>
                        <td>{p.usuario_nombre}</td>
                        <td>
                            <div>
                                <Link className="btn btn-outline-info btn-sm" role="button" to={`/productos/${p.id}`}>Ver</Link>
                                {
                                    p.estado === "Pendiente" && (
                                      <Link className="btn btn-outline-warning btn-sm" role="button" to={`/productos/${p.id}/modificar`}>Completar</Link>  
                                    )
                                }
                                {
                                    p.estado === "Pendiente" && (
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleCancelar(p.id)}>Cancelar</button>
                                    )
                                }
                                
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TablaPedidos