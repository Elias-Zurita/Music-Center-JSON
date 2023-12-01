const path = require ('path')
const { body } = require('express-validator');

module.exports =[
    body ("nombre").notEmpty().withMessage("Tienes que escribir un nombre"), // valida el nombre ("NAME" en formulario de register) no este vacio //
    body ("apellido").notEmpty().withMessage("Tienes que escribir un apellido"),
    body ("telefono").notEmpty().withMessage("Tienes que escribir un telefono"),
    body ("email")
    .notEmpty().withMessage("Tienes que escribir un email").bail() // valida que el campo de email no este vacio //
    .isEmail().withMessage("Debes escribir una direccion de correo electronico válida"), // valida que sea realmente un email y no cualquier texto //
    body ("contraseña").notEmpty().withMessage("Tienes que escribir una contraseña"),
     body('avatar').custom((value, { req }) => { 
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif']; // Tipos de archivos que se podran subir //
		
		if (!file) {
			throw new Error("Debes subir una imagen de perfil"); // Si no tengo un archivo envio ese msj //
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) { //Valida el tipo de archivo //
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true; 
	})
]