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
        res.render("productos/listado", {productos}) 
    },
    detalle: (req, res) => {
        let productos = findAll();
        let productoEncontrado = productos.find(function(producto){
            return producto.id == req.params.id //renderiza el producto que se pida por id //            
        })

        res.render("productos/detalle", {producto: productoEncontrado}) // renderiza el detalle del producto pedido por id //
    }
}