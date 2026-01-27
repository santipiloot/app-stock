import { createContext, useContext, useState } from "react"

const AuthContext  = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [nombre, setNombre] = useState(null);
    //const [apellido, setApellido] = useState(null);
    const [rol, setRol] = useState(null);
    const [error, setError] = useState(null);
    
    const login = async (user, password) => {

        setError(null);

        try{
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user, password}),
            });

            const session = await response.json();

            if (!response.ok && response.status === 400){
                throw new Error(session.error);
            }

            //user: { id: usuario.id, username: usuario.username, nombre: usuario.nombre, rol: rol.nombre }
            setToken(session.token);
            setUser(session.username);
            setNombre(session.nombre);
            setRol(session.rol);
            return {success: true};
        } catch (err) {
            setError(err.message);
            return {success: false};
        }

    };

    const logout = () =>{
        setToken (null);
        setUser(null);
        setNombre(null);
        setRol(null);
        setError(null);
    }

    const fetchAuth = async (url, options = {}) => {
        if (!token) {
            throw new Error("No esta la sesion iniciada");
        }

        return fetch(url, {
            ...options, 
            headers: {...options.headers, Authorization: `Bearer ${token}`},
        });

    };

    return (
        <AuthContext.Provider value={{
            token,
            user, 
            nombre, 
            rol, 
            error, 
            isAuthenticated: !!token,
            login, 
            logout, 
            fetchAuth
        }}>
            {children}
        </AuthContext.Provider>
    );

};

export const AuthPage = ({children}) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated){
        return <h2>Inicia sesion para poder ver la pagina</h2>
    }

    return children;
}
