const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('nombre')
		.notEmpty() // no debe este vacio
		.withMessage("Tienes que escribir un nombre")
		.bail() // si no esta vacio controla lo siguiente
		.isLength({min:2}) // debe tener minimo 2 caracteres
		.withMessage("El nombre debe tener al menos 2 caracteres"), 
	body('apellido')
		.notEmpty() 
		.withMessage("Tienes que escribir un nombre")
		.bail() 
		.isLength({min:2}) 
		.withMessage("El apellido debe tener al menos 2 caracteres"),
	body('email')
		.notEmpty()
		.withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail()
		.withMessage('Debes escribir un formato de correo válido'),
	body('password')
		.notEmpty()
		.withMessage('Tienes que escribir una contraseña')
		.bail()
		.matches(/[A-Z]/)
		.withMessage('Debe contener al menos una letra mayúscula'),
	body('country')
		.notEmpty()
		.withMessage('Tienes que elegir un país'),
	body('avatar')
		.custom((value, { req }) => {
			let file = req.file;
			let acceptedExtensions = ['.jpg', '.png', '.gif'];

			if (!file) {
				throw new Error('Tienes que subir una imagen');
			} else {
				let fileExtension = path.extname(file.originalname);
				if (!acceptedExtensions.includes(fileExtension)) {
					throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
				}
			}

			return true;
		})
]