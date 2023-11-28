const path = require('path'); // Libreria path para usar put y delete
const fs = require('fs');  // Libreria fileSync para leer archivos JSON

function findAll() {
    let productosJson =  fs.readFileSync(path.join(__dirname, "../database/productos.json"))   // Lee el archivo products.json donde estan los productos
    let data = JSON.parse(productosJson) // Declara data para "parsear" (consumir) la info del Json
    return data 
}
function writeJson(array){   // Sobreescribe info al JSON data
    let arrayJSON = JSON.stringify(array, null," ")  // Convierte el array en JSON  //  se agrega null y las comillas para que quede un espacio
    return fs.writeFileSync(path.join(__dirname, "../database/productos.json"), arrayJSON);  
}

module.exports = {
    listado: (req, res) => {
        let productos = findAll();
        res.render("admin/administrar", {productos}) 
    },
    crear: (req, res) => {
        let productos = findAll();
        res.render("admin/crear", {productos})
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
        res.redirect("/administrar");
    },
    editar: (req, res) => {
        let productos = findAll();
        let productoAEditar = productos.find(producto => // Encuentro un producto
            producto.id == req.params.id); // Renderiza el producto que se pide por id

        res.render("admin/editar", {producto: productoAEditar})
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
    }
}

