const bcryptjs = require('bcryptjs');
const {validationResult} = require("express-validator"); 
const User = require("../models/User") // Requiere el archivo User.js de models con las funcionalidades

module.exports = {
    register: (req, res) => {
        res.render("usuarios/register") 
    },
    processRegister: (req,res) => {
        const resultValidation = validationResult(req); // Campos que tuvieron error //

		if (resultValidation.errors.length > 0) { // Si resultValidation es mayor a cero (tiene errores) renderizo el formulario de registro de nuevo //
			return res.render("usuarios/register", {
				errors: resultValidation.mapped(),  // Le pasa a la vista de register los errores que se señalaron en validateRegisterMiddleware //
                oldData:req.body
            });
		}

        let userInDB = User.findByField("email", req.body.email) // Busca si hay un usuario ya registrado con ese mail en la base de datos
      
        if (userInDB) {
            return res.render("usuarios/register", {  // Si esta registrado renderiza nuevamente Register con el msj de validacion
				errors: {
                    email: {
                        msg: 'Este email ya se encuentra registrado'
                    }
                }, 
                oldData: req.body // Mantiene la info que se envio anteriormente
            });
        }

        let userToCreate = {     // Si el mail no estaba registrado y se puede registrar se encripta la contraseña del usuario nuevo
             ...req.body,
            contraseña: bcryptjs.hashSync(req.body.contraseña,10),  // Encripta la contraseña en el archivo de users.json //
            avatar: req.file.filename
        }

        let userCreated = User.create(userToCreate); // Declaro al usuario creado para usarlo despues
        
        return res.redirect("/usuarios/login");
    },
    login: (req, res) => {
        res.render("usuarios/login") 
    },
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email); // Busca el mail con el metodo findByField que esta en User (models)
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.contraseña, userToLogin.contraseña); // Declara como "isOkThePassword" cuando la contraseña ingresada es la misma cargada en la base de datos (la compara con el brycrpt.compareSync por que esta encriptada)
			if (isOkThePassword) {
				delete userToLogin.contraseña; // elimina la contraseña de lo que se visualiza en la consola o en inspeccionar
				req.session.userLogged = userToLogin;

				if (req.body.recordarUsuario) {  // Si se tildo el boton de recordarme (su name en el ejs es recordarUsuario)
                    res.cookie("userEmail", req.body.email, {maxAge: (1000 * 60) * 2} )    // la cookie va a dejar logueado al usuario por 2 minutos (1000 milisegundos x 2) por mas que cierre el navegador
                }

				return res.redirect("/usuarios/profile"); // Accion que hace cuando la contraseña es correcta
			} 
			return res.render("/usuarios/login", { // si la contraseña ingresada es incorrecta renderiza nuevamente con el msj de validacion
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render("/usuarios/login", { // si el mail ingresado no esta registrado muestra el msj de validacion
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
    profile: (req, res) => {
		return res.render("/usuarios/profile", {
			user: req.session.userLogged // La vista del profile va a recibir los datos del usuario logueado
		});
	},
    logout: (req, res) => {
		res.clearCookie("userEmail");  // Destruye la cookie para poder desloguearse
        req.session.destroy();        // Borra lo que se encuentra dentro de la sesion (la cierra)
        return res.redirect("/")     // Redirije al index
	}
}