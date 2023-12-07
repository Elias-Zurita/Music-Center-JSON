function adminMiddleware(req, res, next)  {
    if (typeof req.session.userLogged !="undefined"){
         if(req.session.userLogged.category == 'admin'){  // Si el perfil del usuario logueado es administrador
             return next()
         }
     }
     return res.redirect("/") // sino es admin redirige al Home
 }
 module.exports = adminMiddleware