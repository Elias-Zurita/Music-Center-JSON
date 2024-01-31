const path = require('path'); // Libreria path para usar put y delete
const fs = require('fs');  // Libreria fileSync para leer archivos JSON

// PRODUCTOS JSON
function findAll() {
    let productosJson =  fs.readFileSync(path.join(__dirname, "../database/productos.json"))   // Lee el archivo products.json donde estan los productos
    let data = JSON.parse(productosJson) // Declara data para "parsear" (consumir) la info del Json
    return data 
}
function writeJson(array){   // Sobreescribe info al JSON data
    let arrayJSON = JSON.stringify(array, null," ")  // Convierte el array en JSON  //  se agrega null y las comillas para que quede un espacio
    return fs.writeFileSync(path.join(__dirname, "../database/productos.json"), arrayJSON);  
}

// USUARIOS JSON
function findAllUsers() {
    let usuariosJson =  fs.readFileSync(path.join(__dirname, "../database/usuarios.json"))   // Lee el archivo usuarios.json donde estan los usuarios
    let dataUsers = JSON.parse(usuariosJson) // Declara data para "parsear" (consumir) la info del Json
    return dataUsers 
}

function writeJsonUsers(array){   // Sobreescribe info al JSON data
    let arrayJSON = JSON.stringify(array, null," ")  // Convierte el array en JSON  //  se agrega null y las comillas para que quede un espacio
    return fs.writeFileSync(path.join(__dirname, "../database/usuarios.json"), arrayJSON);  
}

module.exports = {
    listado: (req, res) => {
        let productos = findAll();
        res.render("administrador/administrar", {productos}) 
    },
    crear: (req, res) => {
        let productos = findAll();
        res.render("administrador/crear", {productos})
    },
    crearProceso: (req, res) => {
        let productos = findAll();
        let nuevoProducto = {
            id: productos.length + 1,  // Cuenta la cantidad de elementos que se tienen y le suma uno
            nombre: req.body.nombre,
            modelo: req.body.modelo,
            marca: req.body.marca,
            categoria: req.body.categoria,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: req.file.filename,
        }
        let productosActualizados = [...productos, nuevoProducto]  // Ingresa los datos de nuevoProducto en un producto 

        writeJson(productosActualizados);
        res.redirect("/administrar/productsList");
    },
    editar: (req, res) => {
        let productos = findAll();
        let productoAEditar = productos.find(producto => // Encuentro un producto
            producto.id == req.params.id); // Renderiza el producto que se pide por id

        res.render("administrador/editar", {producto: productoAEditar})
    },
    editarProceso: (req, res) => {
        let productos = findAll();
        let productosActualizados = productos.map(producto =>{ // busca en el array el elemento al que va a editar e itera sobre cada dato
            if (producto.id == req.params.id){ //si el producto es igual al parametro que nos llega por ruta actualiza los datos //
                producto.nombre = req.body.nombre
                producto.modelo = req.body.modelo
                producto.marca = req.body.marca
                producto.categoria = req.body.categoria
                producto.precio = req.body.precio
                producto.descripcion = req.body.descripcion
                producto.imagen = req.file ? req.file.filename : producto.imagen
            }
            return producto
        }) 
        writeJson(productosActualizados); // modifica el producto //

        res.redirect("/productos/detalle/"+req.params.id) // redirecciona a la pagina de detalle del producto editado //
    },
    eliminar: (req, res) => {
        let productos = findAll();
        let dataNueva = productos.filter(function(productos){ // Filtro los productos para excluir el que se debe eliminar
            return productos.id != req.params.id // Todos los productos distintos del seleccionado que vino por id
        })

        writeJson(dataNueva)  // Escribo el nuevo conjunto de productos al archivo JSON sin el producto eliminado

        res.redirect("/administrar");
    },
    userList: (req, res) => {
        let usuarios = findAllUsers();
        res.render("administrador/userList", {usuarios}) 
    },
    userDelete: (req, res) => {
        let usuarios = findAllUsers();
        let dataNueva = usuarios.filter(function(usuarios){ // Filtro los productos para excluir el que se debe eliminar
            return usuarios.id != req.params.id // Todos los productos distintos del seleccionado que vino por id
        })

        writeJsonUsers(dataNueva)  // Escribo el nuevo conjunto de productos al archivo JSON sin el producto eliminado

        res.redirect("/administrar/userList");
    },
    buscarUsuario: (req, res) => {
        let terminoDeBusqueda = req.query.buscar.toLowerCase(); // toma el texto ingresado al campo de busqueda y aplica toLowerCase asi la busqueda cubre mayusculas y minusculas
        let usuarios = findAllUsers();
        let usuariosFiltrados = usuarios.filter(usuario =>
            usuario.nombre.toLowerCase().includes(terminoDeBusqueda) // filtro los usuarios que contengan en su nombre un match con el termino de busqueda ingresado
        );
        res.render("administrador/userList", { usuarios: usuariosFiltrados, terminoDeBusqueda });
    }
}

