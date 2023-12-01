function authMiddleware (req,res,next){
    if (!req.session.userLogged){              // Si no hay nadie logueado
        return res.redirect("/usuarios/login") // Redirecciona al login
    }
    next();   //  Sino el request sigue 
}
    
module.exports = authMiddleware