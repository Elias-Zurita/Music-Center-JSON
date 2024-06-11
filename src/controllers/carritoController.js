const path = require("path");
const fs = require("fs");
const User = require("../models/User");

module.exports = {
  carrito: (req, res) => {
    let carrito = req.session.carrito || [];
    let precioTotal = 0;
    carrito.forEach((item) => {
      precioTotal += item.subtotal;
    });
    return res.render("productos/carrito", { carrito, precioTotal });
  },
  agregarProducto: (req, res) => {
    if (!req.session.userLogged) {
      return res.redirect("/usuarios/login");
    }

    let { id, nombre, precio, cantidad, imagen } = req.body;
    cantidad = parseInt(cantidad);
    precio = parseFloat(precio);

    let carrito = req.session.carrito || [];
    let itemIndex = carrito.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      carrito[itemIndex].cantidad += cantidad;
      carrito[itemIndex].subtotal += cantidad * precio;
    } else {
      carrito.push({
        id,
        nombre,
        precio,
        cantidad,
        imagen,
        subtotal: cantidad * precio,
      });
    }

    req.session.carrito = carrito;
    req.session.carritoTotal = carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );
    return res.redirect("/carrito");
  },
  eliminarProducto: (req, res) => {
    let { id } = req.body;
    let carrito = req.session.carrito || [];
    req.session.carrito = carrito.filter((item) => item.id !== id);
    req.session.carritoTotal = req.session.carrito.reduce(
      (total, item) => total + item.cantidad,
      0
    );
    return res.redirect("/carrito");
  },
  vaciarCarrito: (req, res) => {
    req.session.carrito = [];
    req.session.carritoTotal = 0;
    return res.redirect("/carrito");
  },
};
