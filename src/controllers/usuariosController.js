const bcryptjs = require('bcryptjs');
const path = require('path'); // Libreria path para usar put y delete
const fs = require('fs');  // Libreria fileSync para leer archivos JSON
const {
	validationResult
} = require('express-validator');

const User = require('../models/User');

function findAll() {
    let usuariosJson =  fs.readFileSync(path.join(__dirname, "../database/usuarios.json"))   // Lee el archivo usuarios.json donde estan los usuarios
    let data = JSON.parse(usuariosJson) // Declara data para "parsear" (consumir) la info del Json
    return data 
}

function writeJson(array){   // Sobreescribe info al JSON data
    let arrayJSON = JSON.stringify(array, null," ")  // Convierte el array en JSON  //  se agrega null y las comillas para que quede un espacio
    return fs.writeFileSync(path.join(__dirname, "../database/usuarios.json"), arrayJSON);  
}

const controller = {
	register: (req, res) => {
		return res.render('usuarios/register');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('usuarios/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('usuarios/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/usuarios/login');
	},
	login: (req, res) => {
		return res.render('usuarios/login');
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password; // elimina la contraseña de lo que se visualiza en la consola o en inspeccionar  
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/usuarios/profile');
			} 
			return res.render('usuarios/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('usuarios/login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
	profile: (req, res) => {
		return res.render('usuarios/profile', {
			user: req.session.userLogged
		});
	},
	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	editar: (req, res) => {
		let usuarios = User.findAll();
        let usuarioAEditar = usuarios.find(usuario => // Encuentro un usuario
			usuario.id == req.params.id); // Renderiza el usuario que se pide por id

        res.render("usuarios/editProfile", {usuario: usuarioAEditar})
    },
    editarProceso: (req, res) => {
        let usuarios = User.findAll();
        let usuariosActualizados = usuarios.map(usuario =>{ // busca en el array el elemento al que va a editar e itera sobre cada dato
            if (usuario.id == req.params.id){ //si el producto es igual al parametro que nos llega por ruta actualiza los datos //
                usuario.nombre = req.body.nombre
                usuario.apellido = req.body.apellido
                usuario.country = req.body.country
                usuario.avatar = req.file ? req.file.filename : usuario.avatar
            }
            return usuario
        }) 
        writeJson(usuariosActualizados); // modifica el producto //

		return res.render('usuarios/profile', {
			user: req.session.userLogged
		});
    }
}

module.exports = controller;