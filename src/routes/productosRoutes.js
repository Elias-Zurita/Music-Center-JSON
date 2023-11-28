const express = require('express');
const router = express.Router();

// Controller
const productosController = require("../controllers/productosController");

// Formulario de listado de productos //
router.get("/", productosController.listado);
router.get("/detalle/:id", productosController.detalle);

module.exports = router;