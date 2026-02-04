import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../auth/auth"
import { useParams } from "react-router"


function DetallesProveedores() {

  const {fetchAuth} = useAuth();
  const {id} = useParams();
  const [proveedor, setProveedor] = useState(null);

   const fetchProveedor = useCallback( async () => {
    const response = await fetchAuth(`http://localhost:3000/proveedores/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success){
      console.log("Hubo un error: ", data.error);
      return;
    }

    setProveedor(data.data)
   },[fetchAuth, id]);

   useEffect(() => {
    fetchProveedor();
   }, [fetchProveedor]);

   if (!proveedor){
    return null;
   }

  return (
    <div className='container mt-3'>
      <h2>Detalles de {proveedor.nombre}</h2>
      <br />
      <h2>Nombre: {proveedor.nombre}</h2>
      <h2>Telefono: {proveedor.telefono}</h2>
      <h2>Estado: {proveedor.activo ? "Activo" : "Inactivo"}</h2>  
    </div>
  )
}

export default DetallesProveedores