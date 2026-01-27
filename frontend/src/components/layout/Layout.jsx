import { Outlet, Link } from "react-router";
import { useAuth } from "../../auth/auth";
import Login from "../login/Login.jsx"



function Layout() {

    const {isAuthenticated, logout} = useAuth();

return (
    <main>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/productos">Productos</Link>
                </li>
                {
                    
                }
                <li className="nav-item">
                    <Link className="nav-link active" to="/usuarios">Usuarios</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/proveedores">Proveedores</Link>
                </li>
                <li className="nav-item">
                    {isAuthenticated ? (
                        <button onClick={() => logout()}>Cerrar sesion</button> 
                    ) :  (
                        <Link className="nav-link active" to="/login">Iniciar Sesion</Link>
                    )}
                </li>
                <li>
                    {!isAuthenticated &&
                    <div>Hola</div>
                    }
                </li>
            </ul>
          
        </nav>
        <Outlet/>
    </main>
)

}

export default Layout