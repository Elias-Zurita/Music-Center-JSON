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
    },
    buscar: (req, res) => {
        let terminoDeBusqueda = req.query.buscar.toLowerCase(); // toma el texto ingresado al campo de busqueda y aplica toLowerCase asi la busqueda cubre mayusculas y minusculas
        let productos = findAll();
        let productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(terminoDeBusqueda) // filtro los productos que contengan en su nombre un match con el termino de busqueda ingresado
        );
        res.render('productos/listado', { productos: productosFiltrados, terminoDeBusqueda });
    },
    categoria: (req, res) => {
        let productos = findAll();
        let categoriaSeleccionada = productos.filter(function(productos){ // filtra las categorias de los productos
            return productos.categoria == req.params.categoria // devuelve la categoria del producto pedida por params(seleccionada en el navegador)
        })
        res.render("productos/listado", {productos: categoriaSeleccionada}) 
    }
}