// Visualizador-ocultador de contraseña

var eye = document.getElementById('Eye');
var contraseña = document.getElementById('contraseña');
eye.addEventListener("click", function(){   /* al hacer click en el ojo acciona */
    if (contraseña.type === "password") {  
        contraseña.type = "text";       /* transforma el tipo password (encriptado) a texto */
        eye.classList.add ("hide-eye"); /* tacha el ojo */
    } else {
        contraseña.type = "password";    /* vuelve al formato encriptado */
        eye.classList.remove ("hide-eye"); /* tilda y destilda el ojo tachado */
    }
})
