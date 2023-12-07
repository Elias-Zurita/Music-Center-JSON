const express = require('express');
const router = express.Router();

// Controller
const carritoController = require("../controllers/carritoController");

// Middlewares //
const authMiddleware = require('../middlewares/authMiddleware');

// Formulario de carrito de compras //
router.get("/", carritoController.carrito);
router.get("/agregar/:id", carritoController.agregarAlCarrito);


module.exports = router;