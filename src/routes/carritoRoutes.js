const express = require("express");
const router = express.Router();

// Controller
const carritoController = require("../controllers/carritoController");

// Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// Formulario de listado de productos //
router.get("/", carritoController.carrito);

// Procesa agregar un producto con el authMiddleware (solo si hay alguien logueado)
router.post("/agregar", authMiddleware, carritoController.agregarProducto);

// Eliminar producto del carrito
router.post("/eliminar", carritoController.eliminarProducto);

// Vaciar el carrito de compras
router.post("/vaciar", carritoController.vaciarCarrito);

module.exports = router;
