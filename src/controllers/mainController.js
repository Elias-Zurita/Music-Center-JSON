const path = require("path");

const controller = {
    index: (req, res) =>{
        res.render('index')    // renderiza el index  //
    },
    ubicacion: (req, res) =>{
        res.render('ubicacion')   
    }
 }

module.exports = controller;