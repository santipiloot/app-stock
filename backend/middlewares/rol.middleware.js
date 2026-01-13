export const esAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ 
            success: false, 
            message: "No autenticado" 
        });
    }

    if (req.user.rol !== 'administrador') {
        return res.status(403).json({ 
            success: false, 
            message: "Acceso denegado: Se requieren permisos de administrador" 
        });
    }

    next();
};