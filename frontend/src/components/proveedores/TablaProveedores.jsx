import { Link } from "react-router"
import { useEffect, useState } from "react"
import { useCallback } from "react"

function TablaProveedores() {

    const handleQuitar = async (id) => {

    }

    const [proveedores, setProveedores] = useState([]);

    const fetchProveedores = useCallback(

        async () => {
            const response = await fetch("http://localhost:3000/proveedores");
            const data = await response.json();

            if (!response.ok){
                console.log("Hubo un error: ", data.error);
                return;
            }

            console.log("Proveedores: ", data);

            setProveedores(data.data)
        }
    )

    useEffect(() => {
      
        fetchProveedores();
        
    }, []);


  return (
    <div>
       <h1>Proveedores</h1>
       <Link className="btn btn-success" role="button" to={"/proveedores/crear"}>Agregar proveedor</Link>
       <table className="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Activo</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            {proveedores.map((p)=> (
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>{p.telefono}</td>
                    <td>{p.activo ? "Si" : "No"}</td>
                    <td>
                        <div>
                        <Link className="btn btn-outline-info btn-sm" role="button" to={`/proveedores/${p.id}`}> Ver </Link>
                        <Link className="btn btn-outline-warning btn-sm" role="button" to={`/proveedores/${p.id}/modificar`}> Modificar </Link>
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

export default TablaProveedores