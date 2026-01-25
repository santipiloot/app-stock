import "./index.css"
import { Route, Routes } from "react-router"
import Layout from "./components/layout/Layout.jsx"
import Home from "./components/home/Home.jsx"
import ProductosLayout from "./components/productos/ProductosLayout.jsx"
import FormProducto from "./components/productos/FormProducto.jsx"
import UsuariosLayout from "./components/usuarios/UsuariosLayout.jsx"
import ProveedoresLayout from "./components/proveedores/ProveedoresLayout.jsx"
import FormProveedores from "./components/proveedores/FormProveedores.jsx"
import ModificarProveedores from "./components/proveedores/ModificarProveedores.jsx"
import Login from "./components/login/Login.jsx"

function App() {

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>} />
    </Routes>
      <Routes>
        <Route path="/" element={<Layout/>}>

        <Route index element={<Home/>} />
        
        <Route path="productos" element={<ProductosLayout/>} />
        <Route path="productos/crear" element={<FormProducto/>} />
        

        <Route path="usuarios" element={<UsuariosLayout/>} />
        
        <Route path="proveedores" element={<ProveedoresLayout/>}/>
        <Route path="proveedores/crear" element={<FormProveedores/>}/>
        <Route path="proveedores/:id" element={<ModificarProveedores/>}/>

        
        </Route>

      </Routes>
    </>
  )
}

export default App
