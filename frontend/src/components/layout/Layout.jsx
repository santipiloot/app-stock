import { Outlet, Link } from "react-router";

function Layout() {
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
                <li className="nav-item">
                    <Link className="nav-link active" to="/usuarios">Usuarios</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/proveedores">Proveedores</Link>
                </li>
            </ul>
          
        </nav>
        <Outlet/>
    </main>
)

}

export default Layout