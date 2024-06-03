const path = require("path");
const fs = require("fs");
const User = require("../models/User");

function findAll() {
  let productosJson = fs.readFileSync(
    path.join(__dirname, "../database/productos.json")
  );
  let data = JSON.parse(productosJson);
  return data;
}

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

        let { id, nombre, precio, cantidad } = req.body;
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
            subtotal: cantidad * precio,
        });
        }

        req.session.carrito = carrito;
        return res.redirect("/carrito");
    },
    eliminarProducto: (req, res) => {
        let { id } = req.body;
        let carrito = req.session.carrito || [];
        req.session.carrito = carrito.filter((item) => item.id !== id);
        return res.redirect("/carrito");
    },
    vaciarCarrito: (req, res) => {
        req.session.carrito = [];
        return res.redirect("/carrito");
    }
};