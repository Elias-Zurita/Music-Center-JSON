const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const controllerAdmin = require("../controllers/adminController");

// Middlewares //
const uploadFile = require('../middlewares/multerMiddlewareProductos');

router.get('/', controllerAdmin.listado) // Renderizado de listado
router.get('/crear', controllerAdmin.crear) // Renderizado de Vista Crear
router.post('/crear', uploadFile.single("imagen"), controllerAdmin.crearProceso) // Proceso de creacion
router.get('/editar/:id', controllerAdmin.editar) // Renderizado de Vista Editar
router.put('/editar/:id', uploadFile.single("imagen"), controllerAdmin.editarProceso) // Proceso de edicion

module.exports = router;