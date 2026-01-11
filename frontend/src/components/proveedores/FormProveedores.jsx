import { useState } from "react"
import { Link, useNavigate } from "react-router"

function FormProveedores() {

    const navigate = useNavigate();

    const initialValues = {
        nombre: "",
        telefono: "",
        activo: true
    }

    const [values, setValues] = useState(initialValues);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Aca va el fetch para el post, setValues y el navigate
    }

  return (
    <div className="modal">
        <h2>Ingrese datos del proveedor</h2>
        <form onSubmit={handleSubmit}>
           <div className="mb-3">
    <label htmlFor="" className="form-label">Nombre</label>
    <input required value={values.nombre} onChange={(e) => setValues({...values, nombre: e.target.value})}  className="form-control" id="InputNombre" aria-describedby="nombreHelp" />
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label htmlFor="" className="form-label">Telefono</label>
    <input required value={values.telefono} onChange={(e) => setValues({...values, telefono: e.target.value})}  className="form-control" id="InputTelefono" aria-describedby="telefonoHelp" />
    <div id="telefonoHelp" className="form-text"></div>
  </div>
  {/* Activo como select */}
  
  
  <button type="submit" className="btn btn-primary">Agregar</button>
  <button type="submit" className="btn btn-primary">Cancelar</button>  
        </form>

        
    </div>
  )
}

export default FormProveedores