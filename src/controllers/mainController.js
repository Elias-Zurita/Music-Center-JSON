const path = require("path");

const controller = {
    index: (req, res) =>{
        res.render('index')    // renderiza el index  //
    },
    ubicacion: (req, res) =>{
        res.render('web/ubicacion')   
    },
    contacto: (req, res) =>{
        res.render('web/contacto')   
    }
 }

module.exports = controller;