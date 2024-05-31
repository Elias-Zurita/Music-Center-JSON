const express = require("express");
const router = express.Router();

// Controller
const carritoController = require("../controllers/carritoController");

// Formulario de listado de productos //
router.get("/", carritoController.carrito);

module.exports = router;
