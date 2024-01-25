const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usuariosController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddlewareUsuarios');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, usersController.profile);

// Logout
router.get('/logout/', usersController.logout);

// Formulario de edicion de perfil
router.get('/editProfile/:id', authMiddleware, usersController.editar)

// Procesa edicion de perfil
router.put('/editProfile/:id', uploadFile.single("avatar"), authMiddleware, usersController.editarProceso) 

module.exports = router;