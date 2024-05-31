carrito = []; // declaro el carrito vacio 

if (localStorage.getItem("carrito") != null) { // Si el carrito no esta vacio almacena lo que viene por almacenamiento local
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

mostrarProdCompra();
mostrarPrecioTotal();
revisarCarrito();

//Reviso cuantos productos hay en el carrito
function revisarCarrito() {
  if (carrito.length == 0) {
    document.getElementById("carritoSinProductos").innerHTML = `
        <p class="no-products-info">No hay productos seleccionados</p>
        <a href="./products.html"><button class="btn btn-products"><span>Ver los productos </span></button></a>`;
    document.getElementById("totalCompra").innerHTML = ``;
    $("#totalCompra").css({ border: "none" });
    document.getElementById("finalizar").innerHTML = ``;
    document.getElementById(
      "numeroItemsCarrito"
    ).innerHTML = `${carrito.length}`;
    document.getElementById("datos-finalizar-compra").innerHTML = ``;
  } else {
    document.getElementById("carritoSinProductos").innerHTML = ``;
    document.getElementById("finalizar").innerHTML = `
        <a href="./products.html" class="btn buttons-shop btn-continue"><p>Continuar comprando</p></a>
        <a href="./endShop.html" class="btn buttons-shop btn-endShop"><p>Comprar con Mercadopago</p></a>
        <button type="button" class="btn buttons-shop btn-vaciar" id="btn-vaciar" onclick="vaciarCarrito()">Vaciar Carrito</button>
        `;
    document.getElementById(
      "numeroItemsCarrito"
    ).innerHTML = `${carrito.length}`;
  }
}

function mostrarProdCompra() {
  // mostrar tabla de productos agregados en el carrito
  let listaCarrito = ``;
  for (let i = 0; i < carrito.length; i++) {
    listaCarrito += `
        <div class="row animate__animated animate__fadeInUp" id="row${i}">
            <div class="row-img"><img  src="${carrito[i].imagen}" alt="${carrito[i].nombre}"></div>
            <div class="row-name"><p>${carrito[i].nombre}</p></div> 
            <div class="row-quantity">
                <div class="quantity">
                    <button type="button" class="btn btn-light operador" id="min${i}"><span class="material-icons operador-icon">remove_circle_outline</span></button>
                    <div class="input-box-cantidad" id="inputCantidad${i}">
                        <input class="input-cantidad" value="${carrito[i].cantidad}">
                    </div>
                    <button type="button" class="btn btn-light operador" id="plus${i}"><span class="material-icons operador-icon">add_circle_outline</span></button>
                </div>
            </div>
            <div class="row-price" id="subtotal${i}"></div>
            <button type="button" class="btn row-removeItem" onclick="eliminarProductoCarrito([${i}])"><i class="fas fa-trash-alt"></i></button>
        </div> 
        `;
  }
  document.getElementById("carritoProductos").innerHTML = listaCarrito;

  //Subtotal por producto, segun cantidad de cada producto y su precio
  for (let i = 0; i < carrito.length; i++) {
    document.getElementById(`subtotal${i}`).innerHTML = `<p>$${
      carrito[i].cantidad * carrito[i].precio
    }</p>`;

    //aumentar y disminuir cantidad del producto y modifical el subtotal
    $(`#plus${i}`).click(function () {
      //se pueden pedir hasta 10 unidades del mismo producto
      if (carrito[i].cantidad < 10) {
        carrito[i].cantidad += 1;
        document.getElementById(
          `inputCantidad${i}`
        ).innerHTML = `<input class="input-cantidad" value="${carrito[i].cantidad}">`;
        document.getElementById(`subtotal${i}`).innerHTML = `<p>$${
          carrito[i].cantidad * carrito[i].precio
        }</p>`;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarPrecioTotal();

        $(`#plus${i}`).css({
          color: "rgb(0, 0, 0)",
          backgroundColor: "rgb(212, 189, 184)",
          borderRadius: "15px",
        });
        setTimeout(function () {
          $(`#plus${i}`).css({ color: "inherit", backgroundColor: "inherit" });
        }, 400);
      }
    });
    $(`#min${i}`).click(function () {
      //la cantidad minima del producto es 1
      if (carrito[i].cantidad > 1) {
        carrito[i].cantidad -= 1;
        document.getElementById(
          `inputCantidad${i}`
        ).innerHTML = `<input class="input-cantidad" value="${carrito[i].cantidad}">`;
        document.getElementById(`subtotal${i}`).innerHTML = `<p>$${
          carrito[i].cantidad * carrito[i].precio
        }</p>`;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarPrecioTotal();

        $(`#min${i}`).css({
          color: "rgb(0, 0, 0)",
          backgroundColor: "rgb(212, 189, 184)",
          borderRadius: "15px",
        });
        setTimeout(function () {
          $(`#min${i}`).css({ color: "inherit", backgroundColor: "inherit" });
        }, 400);
      }
    });
  }
}

function mostrarPrecioTotal() {
  // precio total de los productos seleccionados en el carrito
  let acuTotalPrecio = 0;
  for (let i = 0; i < carrito.length; i++) {
    acuTotalPrecio += carrito[i].cantidad * carrito[i].precio;
  }
  document.getElementById(
    "totalCompra"
  ).innerHTML = `<p class="total-compra-precio" id="totalCompraPrecio">Total: $${acuTotalPrecio}</p>`;
  document
    .getElementById("totalCompraPrecio")
    .classList.add("animate__animated", "animate__headShake");
}

function eliminarProductoCarrito(index) {
  document
    .getElementById(`row${index}`)
    .classList.add("animate__animated", "animate__fadeOutRight");
  setTimeout(function () {
    let removeProd = carrito.splice(index, 1);
    //elimina un producto del carrito -> y el carrito queda con las otras posiciones
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProdCompra();
    mostrarPrecioTotal();
    revisarCarrito();
  }, 550);
}

//vacia todos los productos agregados al carrito
function vaciarCarrito() {
  Swal.fire({
    title: "¿Deseas eliminar todos los productos seleccionados?",
    width: 600,
    text: "No podrás revertir esta acción",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(137, 162, 196)",
    cancelButtonColor: "rgb(188, 143, 143)",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Aceptar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Productos eliminados", "El carrito está vacio", "success");
      localStorage.clear();
      carrito = [];

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      mostrarProdCompra();
      mostrarPrecioTotal();
      revisarCarrito();
    }
  });
}
