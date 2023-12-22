// CUENTA REGRESIVA

const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

let fechaLimite = new Date("July 5, 2024 00:00:00").getTime();

// Función para actualizar la cuenta regresiva
function updateCountdown() {
    const fechaActual = new Date();
    const diferencia = fechaLimite - fechaActual;

    if (diferencia < 0) {
        // Si la diferencia es menor que 0, reiniciar la cuenta regresiva
        fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() + 1); // Agregar 1 día (24 horas)
        fechaLimite.setHours(0, 0, 0, 0); // Establecer hora a las 00:00:00

        // Recalcular la diferencia
        diferencia = fechaLimite - fechaActual;
    }


    const horas = Math.floor((diferencia / 1000 / 60 / 60) % 24);
    const minutos = Math.floor((diferencia / 1000 / 60) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    hours.innerHTML = horas < 10 ? '0' + horas : horas;
    minutes.innerHTML = minutos < 10 ? '0' + minutos : minutos;
    seconds.innerHTML = segundos < 10 ? '0' + segundos : segundos;
}

setInterval(updateCountdown, 1000);
// En este código, cuando la diferencia es menor que 0 (cuando llega a cero), se reinicia la fecha límite sumando un día a la fecha actual
// y configurándola a las 00:00:00. Luego, se vuelve a calcular la diferencia con la nueva fecha límite y se actualiza la cuenta regresiva
// con los nuevos valores. Esto permitirá que la cuenta regresiva se reinicie automáticamente cada vez que llegue a cero y continúe indefinidamente.