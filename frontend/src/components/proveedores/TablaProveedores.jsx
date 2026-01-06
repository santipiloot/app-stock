const proveedores = [{id: 1, nombre: "Jose Maria", telefono: 380412344332, activo: true}, {id: 2, nombre: "Maria Jose", telefono: 380412344332, activo: true}, {id: 3, nombre: "Tapia Chiqui", telefono: 380412344332, activo: false}, {id: 4, nombre: "Chiqui Tapia", telefono: 380412344332, activo: false}]

import { Link } from "react-router"

function TablaProveedores() {

    const handleQuitar = async (id) => {

    }

  return (
    <div>
       <h1>Proveedores</h1>
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
                        <Link className="btn btn-outline-info btn-sm" role="button" to={`/medicos/${p.id}`}> Ver </Link>
                        <Link className="btn btn-outline-warning btn-sm" role="button" to={`/medicos/${p.id}/modificar`}> Modificar </Link>
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