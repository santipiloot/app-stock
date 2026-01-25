import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"

//Los productos tienen nombre, descripcion, codigo_barra, categoria_id, stock, stock_critico, precio, proveedor_id, activo

function FormProducto() {

    const navigate = useNavigate();

    const initialValues = {
        nombre: "",
        descripcion: "",
        codigo_barra: "",
        categoria_id: "",
        stock: "",
        stock_critico: "",
        precio: "",
        proveedor_id: "",
        activo: true
    }

    const [proveedores, setProveedores] = useState([]);
    const [categorias, setCategorias] = useState([{ id: 1, nombre: "Bebidas" },
        { id: 2, nombre: "Frutas" },
        { id: 3, nombre: "Panificacion" }]);
    const [values, setValues] = useState(initialValues);

    

    const fetchProveedores = async () => {

        const response = await fetch("http://localhost:3000/proveedores");
        const data = await response.json();

        console.log("Proveedores traidas: ", data);

        setProveedores(data.data)
    
    }

     const fetchCategorias = async () => {

        const response = await fetch("http://localhost:3000/categorias");
        const data = await response.json();

        console.log("Categorias traidas: ", data);

        setCategorias(data.data)
    
     }

     useEffect(() => {
        fetchProveedores();
        //fetchCategorias();
     }, []);


     
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/productos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values),   
        });

        const data = await response.json();

        if (!response.ok){
            console.log("Hubo un error: ", data.error);
            return alert("Error al crear el producto");
        }

        navigate("/productos");
        
    }


  return (
    <div className='container mt-3'>
        <h2>Ingrese producto</h2>
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input required value={values.nombre} onChange={(e) => setValues({...values, nombre: e.target.value})} className="form-control" />
            </div>

            <div className="mb-3">
                <label className="form-label">Descripcion</label>
                <textarea value={values.descripcion} onChange={(e) => setValues ({...values, descripcion: e.target.value})} className="form-control" />
            </div>

            <div className='mb-3'>
                <label className="form-label">Código de Barra</label>
                <input 
                    value={values.codigo_barra} 
                    onChange={(e) => setValues({...values, codigo_barra: e.target.value})} 
                    className="form-control" />
            </div>

            <div className='mb-3'>
                <label className="form-label">Categoría</label>
                <select 
                    required
                    className="form-select"
                    value={values.categoria_id}
                    onChange={(e) => setValues({...values, categoria_id: e.target.value})}
                >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                </select>
            </div>

            <div className='mb-3'>
                <label className="form-label">Proveedor</label>
                <select 
                    required
                    className="form-select"
                    value={values.proveedor_id}
                    onChange={(e) => setValues({...values, proveedor_id: e.target.value})}
                >
                    <option value="">Seleccione un proveedor</option>
                    {proveedores.map((prov) => (
                        <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                    ))}
                </select>
            </div>

           <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Precio</label>
                    <input 
                        required
                        type="number" 
                        className="form-control"
                        value={values.precio}
                        onChange={(e) => setValues({...values, precio: e.target.value})}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Stock</label>
                    <input 
                        required
                        type="number" 
                        className="form-control"
                        value={values.stock}
                        onChange={(e) => setValues({...values, stock: e.target.value})}
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Stock Crítico</label>
                    <input 
                        required
                        type="number" 
                        className="form-control"
                        value={values.stock_critico}
                        onChange={(e) => setValues({...values, stock_critico: e.target.value})}
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/productos")}>Cancelar</button>

        </form>
    </div>
  )
}

export default FormProducto