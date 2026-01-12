import React from 'react'
import { Link } from "react-router"

//Los productos tienen nombre, descripcion, codigo_barra, categoria_id, stock, stock_critico, precio, proveedor_id, activo

const productos = [{id: 1, nombre: "Producto 1", descripcion: "Descripcion del producto 1", codigo_barra: "123456789", categoria_id: 1, stock: 10, stock_critico: 5, precio: 100, proveedor_id: 1, activo: true}, {id: 2, nombre: "Producto 2", descripcion: "Descripcion del producto 2", codigo_barra: "123456789", categoria_id: 1, stock: 50, stock_critico: 10, precio: 200, proveedor_id: 1, activo: true}]


function TablaProductos() {

    const handleQuitar = async (id) => {

    }

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
                                <Link className="btn btn-outline-info btn-sm" role="button" to={`/productos/${p.id}`}>Ver</Link>
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