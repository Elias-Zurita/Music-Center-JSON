const fs = require('fs');   // declara la libreria fs para usar fileSync despues (para leer archivos) //
const path = require ("path")

const User = {
	fileName: '../database/usuarios.json', 

	getData: function () {                                              
		return JSON.parse(fs.readFileSync(path.join(__dirname,this.fileName), 'utf-8')); // Lee el listado de users.json y al poner JSON.parse lo lee como un array y no como string
	},
    
	generateId: function () {             // Generacion de un id
		let allUsers = this.findAll();    // Encuentra todos los usuarios
		let lastUser = allUsers.pop();    // Obtiene al ultimo usuario y lo llama lastUser
		if (lastUser) {                  
			return lastUser.id + 1;       // Le suma 1 al ultimo id de usuario 
		}
		return 1;                         // Si no hay ningun usuario al cual sumarle sera id 1 (por que seria el primero)
	},

	findAll: function () {       		  // Obtiene todos los usuarios
		return this.getData();
	},

	findByPk: function (id) {              // Busca a un usuario por su id
		let allUsers = this.findAll();     // Obtiene todos los usuarios y lo llama allUsers
		let userFound = allUsers.find(oneUser => oneUser.id === id);   //  userFound le llama al id de usuario encontrado
		return userFound;     //  Devuelve el usuario encontrado
	},

	findByField: function (field, text) {  // Busca un usuario por un determinado campo (email, id, nombre, etc)
		let allUsers = this.findAll();     // Encuentra todos los usuarios
		let userFound = allUsers.find(oneUser => oneUser[field] === text);  // Busca al usuario por el campo que se eligio
		return userFound;
	},

	create: function (userData) {         // Creacion de un usuario
		let allUsers = this.findAll();    // Encuentra a todos los usuarios
		let newUser = {                   
			id: this.generateId(),       
			...userData                   // Mete los datos nuevos 
		}
		allUsers.push(newUser);           // Agrega datos del newUser
		return fs.writeFileSync(path.join(__dirname, this.fileName), JSON.stringify(allUsers, null, 4));    // null, " " hace que se agregue como JSON (ordenado)
	},

	delete: function (id) {              // Eliminacion de un usuario
		let allUsers = this.findAll();   // Encuentra a todos los usuarios
		let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);           // finalUsers es el array sin el usuario eliminado. 
		fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));   // Filtra buscando todos los usuarios y los devuelve a todos menos al indicado por id (el usuario a eliminar)
		return true;                                                              
	}
}

module.exports = User;