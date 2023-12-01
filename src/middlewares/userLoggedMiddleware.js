const User = require("../models/User.js") // Requiere el archivo User.js de models con las funcionalidades

function userLoggedMiddleware (req, res, next) {
    res.locals.isLogged = false;      // cuando el usuario no esta logueado    
  
    let emailInCookie = req.cookies.userEmail;  // En emailInCookie requiero las cookies y lo que vino de email
    let userFromCookie = User.findByField("email", emailInCookie)  // userFromCookie es un usuario que encuentra de la base de datos de User

    if (userFromCookie){ // Si encontre al usuario 
        req.session.userLogged = userFromCookie; 
    }

    if (req.session.userLogged) {     // Si hay alguien logueado
        res.locals.isLogged = true    // cuando el usuario esta logueado
        res.locals.userLogged = req.session.userLogged     // pasa lo que tiene en sesion (los datos del usuario con el session.userLogged) a la vista (la variable local)
    }

    next()
}

module.exports = userLoggedMiddleware