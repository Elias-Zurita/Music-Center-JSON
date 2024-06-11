const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override'); // Es una libreria que permite utilizar PUT y DELETE
const session = require('express-session');  // Es una libreria que se usa para las sesiones  
const cookies = require('cookie-parser');  // Es una libreria que se usa para guardar en el navegador usado y en el servidor (en este caso lo uso para dejar logueado por un tiempo "X" al usuario)

// Routers
const indexRouter = require('./src/routes/mainRoutes.js');
const productosRouter = require('./src/routes/productosRoutes');
const usuariosRouter = require('./src/routes/usuariosRoutes');
const adminRouter = require('./src/routes/adminRoutes.js');
const carritoRouter = require('./src/routes/carritoRoutes');

const app = express();

const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware')

app.use(session({                 // Inicializacion de sesion
  secret:"Shh, es un secreto",
  resave: false,                  // Propiedades de session que se deben setear como false
  saveUninitialized: false,       // Propiedades de session que se deben setear como false
}))

// Si cartTotal en la sesion del usuario es undefined es cero. 
app.use((req, res, next) => {
  res.locals.cartTotal = req.session.carritoTotal || 0;
  next();
});

app.use(cookies());
app.use(userLoggedMiddleware) // Es importante que vaya despues de la inicializacion de la sesion

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs'); // Motor de vistas EJS
app.use(methodOverride('_method')); // Permite utilizar otros metodos ademas de GET y POST

app.use(logger('dev')); // Permite que llegue info del formulario al req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Ubicacion de archivos estaticos


// Rutas a utilizar
app.use('/', indexRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/administrar', adminRouter);
app.use('/carrito', carritoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;