let body = document.querySelector('body'); // selecciono el body del html
let iconCart = document.querySelector('.icon-cart'); // selecciono el carrito del header para usar como boton
let iconCartSpan = document.querySelector('.icon-cart span'); // obtengo el contador del carrito del header
let listProductHTML = document.querySelector('.listadoPadre');
let listCartHTML = document.querySelector('.listCart');
let closeCart = document.querySelector('.close');
let products = []; // declaro vacio el array de productos
var cart =[]; // declaro vacio el array del carrito

iconCart.addEventListener('click', () => { // Al realizar click en el carrito muestro el menu, y al hacer click lo cierro
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => { 
    body.classList.toggle('showCart');
})

// ESTO SIRVE PARA AGREGAR PRODUCTOS AL CARRITO (FUNCIONA)
function addtocart(a){
    cart.push({...products[a]});
    displaycart();
}

// ESTO SIRVE PARA ELIMINAR EL PRODUCTO DEL CARRITO (FUNCIONA)
function delElement(a){ 
    cart.splice(a, 1);
    displaycart();
}

 // OBTIENE LOS PRODUCTOS DEL JSON (NO ANDA, NO HACE UN CHOTO)
const initApp = () => { 
    
    fetch('../../src/database/productos.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}

initApp(); 

function displaycart(){
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('');
    }
}



