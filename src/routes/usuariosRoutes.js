const express = require('express');
const router = express.Router();

// Controller
const usuariosController = require("../controllers/usuariosController");

// Formulario de listado de usuarios //
router.get("/list", usuariosController.list);

module.exports = router;