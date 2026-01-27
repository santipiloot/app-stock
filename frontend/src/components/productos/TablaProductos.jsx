import { Link } from "react-router"
import { useEffect, useState } from "react"
import { useCallback } from "react"

//Los productos tienen nombre, descripcion, codigo_barra, categoria_id, stock, stock_critico, precio, proveedor_id, activo

function TablaProductos() {

    const handleQuitar = async (id) => {

        if (window.confirm("¿Confirma que quiere eliminar a este producto?")){

            const response = await fetch(`http://localhost:3000/productos/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok || !data.success){
                console.log("Hubo un error: ", data.error);
                return;
            }

            await fetchProductos();
        }

    }

    const [productos, setProductos] = useState([]);

    const fetchProductos = useCallback(
        async () => {
            const response = await fetch("http://localhost:3000/productos");
            const data = await response.json();

            if (!response.ok){
                console.log("Hubo un error: ", data.error);
                return;
            }

            console.log("Productos: ", data);

            setProductos(data.data)
        }
    )

    useEffect(() => {
      
        fetchProductos();
     
    }, []);
    

  return (
    <div>
        <Link className='btn btn-success' role='button' to={"/productos/crear"}>Agregar producto</Link>
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Codigo de barra</th>
                    <th scope='col'>Categoria</th>
                    <th scope='col'>Stock</th>
                    <th scope='col'>Precio</th>
                    <th scope='col'>Activo</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.nombre}</td>
                        <td>{p.codigo_barra}</td>
                        <td>{p.categoria_id}</td>
                        <td>{p.stock}</td>
                        <td>{p.precio}</td>
                        <td>{p.activo ? "Si" : "No"}</td>
                        <td>
                            <div>
                                {/* <Link className="btn btn-outline-info btn-sm" role="button" to={`/productos/${p.id}`}>Ver</Link> */}
                                <Link className="btn btn-outline-warning btn-sm" role="button" to={`/productos/${p.id}/modificar`}>Modificar</Link>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleQuitar(p.id)}>Quitar</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TablaProductos