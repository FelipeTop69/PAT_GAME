document.addEventListener('DOMContentLoaded', function(){
    const puntos = localStorage.getItem('puntos');  // Recupera los puntos
    const puntosRequeridos = localStorage.getItem('puntosRequeridos');  // Recupera el icono asignado
    asignarValores(puntos, puntosRequeridos)
    
})

// Esperar 6 segundos (6000 ms) antes de ejecutar esta función
setTimeout(function() {
    // Seleccionar el elemento con la clase 'loader-validacion'
    const loader = document.querySelector('.loader-validacion');

    // Iniciar la transición de desvanecimiento
    if (loader) {
        loader.style.opacity = '0'; // Cambiar opacidad a 0 para comenzar el fade out

        // Después de la transición, eliminar el elemento del DOM (opcional)
        setTimeout(function() {
            // loader.style.display = 'none';
        }, 1000); // Esperar el tiempo de la transición (1s) antes de eliminarlo
    }
}, 6000);

const iconoBien = `<svg class="position-absolute top-50 start-50 translate-middle" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 512 512"><path fill="#059669" d="m173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69L432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001"/></svg>`;
const iconoMal = `<svg class="position-absolute top-50 start-50 translate-middle" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 42 42"><path fill="#e11d48" fill-rule="evenodd" d="m21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0z"/></svg>`;
const contenedorIcono = document.getElementById('contenedorIconoCalificacion');
const textoPuntos = document.getElementById('textoPuntos')
const contenedorPuntos = document.getElementById('contenedorPuntos');
let iconoAsignado;

function asignarValores(pPuntos, pPuntosRequeridos){
    const puntos = pPuntos;
    const puntosRequeridos = pPuntosRequeridos;
    const textoPuntosNumero = document.createElement('h4');
    

    if(puntos >= puntosRequeridos){
        iconoAsignado = iconoBien;
        textoPuntos.className = ('texto-puntos-bien')
        textoPuntosNumero.className = 'texto-bien'
    }else{
        iconoAsignado = iconoMal;
        textoPuntos.className = ('texto-puntos-mal')
        textoPuntosNumero.className = 'texto-mal'
    }

    textoPuntosNumero.textContent = puntos

    contenedorIcono.innerHTML = iconoAsignado;
    contenedorPuntos.appendChild(textoPuntosNumero)
}