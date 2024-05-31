const path = require('path'); // Libreria path para usar put y delete
const fs = require('fs');  // Libreria fileSync para leer archivos JSON

module.exports = {
    carrito: (req, res) => {
        res.render("productos/carrito") 
    }
}