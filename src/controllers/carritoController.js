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

// Array que simula el carrito de compras
let carrito = [];

module.exports = {
    carrito: (req, res) => {
        res.render("productos/carrito")
    },
    agregarAlCarrito: (req, res) => {
        let productos = findAll();
        let producto = productos.find(function(producto){
            return producto.id == req.params.id //renderiza el producto que se pida por id //            
        })
        
        if (producto) {
            // Agrega el producto al carrito
            carrito.push(producto);
            res.redirect('/productos/listado');
        } else {
            res.status(404).send('Producto no encontrado');
        }
    }/* ,
    eliminarDelCarrito: (req, res) => {
        const productId = req.params.id;  // El ID del producto que se va a eliminar del carrito

        // Filtra el carrito para excluir el producto con el ID dado
        carrito = carrito.filter(item => item.id.toString() !== productId);
    
        res.redirect('/carrito');  // Redirige de nuevo a la vista del carrito
    } */
}

