let body = document.querySelector('body'); // selecciono el body del html
let iconCart = document.querySelector('.icon-cart'); // selecciono el carrito del header para usar como boton
let iconCartSpan = document.querySelector('.icon-cart span'); // obtengo el contador del carrito del header
let listProductHTML = document.querySelector('.listadoPadre');
let listCartHTML = document.querySelector('.listCart');
let closeCart = document.querySelector('.close');
let products = []; // declaro vacio el array de productos
let cart = []; // declaro vacio el array del carrito

iconCart.addEventListener('click', () => { // Al realizar click en el carrito muestro el menu, y al hacer click lo cierro
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => { 
    body.classList.toggle('showCart');
})


/* ESTO ES PARA CREAR EL LISTADO DE PRODUCTOS ME PARECE */
const addDataToHTML = () => {
    if(products.length > 0){  // si hay productos
        products.forEach(product => {
            let newProduct = document.createElement('div'); // creo un div para el nuevo producto
            newProduct.dataset.id = product.id; // el div obtendra el id del producto
            newProduct.classList.add('item'); // al nuevo div le pongo la clase "item"
            newProduct.innerHTML = // le agrego al producto la siguiente info con sus etiquetas
            `<img src="${product.imagen}" alt="">
            <h2>${product.nombre}</h2>
            <div class="price">$${product.precio}</div>
            <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct); // agrega un elemento hijo (un nuevo producto) al listado de productos
        });
    }
}

// 
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})


const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}
