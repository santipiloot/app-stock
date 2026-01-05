import "./index.css"
import { Route, Routes } from "react-router"
import Layout from "./components/layout/Layout.jsx"
import Home from "./components/home/Home.jsx"
import ProductosLayout from "./components/productos/ProductosLayout.jsx"
import UsuariosLayout from "./components/usuarios/UsuariosLayout.jsx"
import ProveedoresLayout from "./components/proveedores/ProveedoresLayout.jsx"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>

        <Route index element={<Home/>} />
        
        <Route path="productos" element={<ProductosLayout/>} />

        <Route path="usuarios" element={<UsuariosLayout/>} />

        <Route path="proveedores" element={<ProveedoresLayout/>}/>
        
        </Route>

      </Routes>
    </>
  )
}

export default App
