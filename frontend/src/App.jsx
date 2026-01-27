import "./index.css"
import { Route, Routes } from "react-router"
import Layout from "./components/layout/Layout.jsx"
import Home from "./components/home/Home.jsx"
import ProductosLayout from "./components/productos/ProductosLayout.jsx"
import FormProducto from "./components/productos/FormProducto.jsx"
import UsuariosLayout from "./components/usuarios/UsuariosLayout.jsx"
import ProveedoresLayout from "./components/proveedores/ProveedoresLayout.jsx"
import DetallesProveedores from "./components/proveedores/DetallesProveedores.jsx"
import FormProveedores from "./components/proveedores/FormProveedores.jsx"
import ModificarProveedores from "./components/proveedores/ModificarProveedores.jsx"
import Login from "./components/login/Login.jsx"
import { AuthPage, AuthProvider } from "./auth/auth.jsx"

function App() {

  return (
    <>
    <AuthProvider>
      <Routes>
      <Route path="/login" element={<Login/>} />
    </Routes>
      <Routes>
        <Route path="/" element={<Layout/>}>

        <Route index element={<Home/>} />

        {/* Productos */}
        
        <Route path="productos" element={
          <AuthPage>
            <ProductosLayout/>
          </AuthPage>
          } />

        <Route path="productos/crear" element={
          <AuthPage>
            <FormProducto/>
          </AuthPage>
          } />

          {/* Usuarios */}
        
        <Route path="usuarios" element={<UsuariosLayout/>} />

        {/* Proveedores */}
        
        <Route path="proveedores" element={
          <AuthPage>
            <ProveedoresLayout/>
          </AuthPage>
          
          }/>

          <Route path="proveedores/:id" element={
          <AuthPage>
            <DetallesProveedores/>
          </AuthPage>
          
          }/>

        <Route path="proveedores/crear" element={
          <AuthPage>
            <FormProveedores/>
          </AuthPage>
          
          }/>

        <Route path="proveedores/:id/modificar" element={
          <AuthPage>
            <ModificarProveedores/>
          </AuthPage>
          
          }/>

        
        </Route>

      </Routes>
    </AuthProvider>
    
    </>
  )
}

export default App
