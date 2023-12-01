const express = require('express');
const router = express.Router();

// Controller
const usuariosController = require("../controllers/usuariosController");

// Middlewares //
const uploadFile = require('../middlewares/multerMiddlewareUsuarios');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Formulario de registro
router.get('/register', guestMiddleware, usuariosController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usuariosController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usuariosController.login);

// Procesar el login
router.post('/login', usuariosController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, usuariosController.profile);

// Logout
router.get('/logout/', usuariosController.logout);

module.exports = router;