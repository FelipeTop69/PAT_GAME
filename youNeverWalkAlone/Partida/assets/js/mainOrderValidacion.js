document.addEventListener('DOMContentLoaded', function(){
    let puntos = localStorage.getItem('puntos');  
    let puntosRequeridos = localStorage.getItem('puntosRequeridos');  

    puntos = puntos ? parseInt(puntos, 10) : 0;

    asignarValores(puntos, puntosRequeridos)

    localStorage.removeItem('puntos');
    
})

const iconoBien = `<svg class="position-absolute top-50 start-50 translate-middle" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 512 512"><path fill="#059669" d="m173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69L432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001"/></svg>`;
const iconoMal = `<svg class="position-absolute top-50 start-50 translate-middle" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 42 42"><path fill="#e11d48" fill-rule="evenodd" d="m21.002 26.588l10.357 10.604c1.039 1.072 1.715 1.083 2.773 0l2.078-2.128c1.018-1.042 1.087-1.726 0-2.839L25.245 21L36.211 9.775c1.027-1.055 1.047-1.767 0-2.84l-2.078-2.127c-1.078-1.104-1.744-1.053-2.773 0L21.002 15.412L10.645 4.809c-1.029-1.053-1.695-1.104-2.773 0L5.794 6.936c-1.048 1.073-1.029 1.785 0 2.84L16.759 21L5.794 32.225c-1.087 1.113-1.029 1.797 0 2.839l2.077 2.128c1.049 1.083 1.725 1.072 2.773 0z"/></svg>`;
let iconoAsignado;

function asignarValores(pPuntos, pPuntosRequeridos){
    const puntos = pPuntos;
    const puntosRequeridos = pPuntosRequeridos;
    

    if(puntos >= puntosRequeridos){
        iconoAsignado = iconoBien;
        textoPuntos.className = ('texto-puntos-bien')
        puntosTitulo.className = 'texto-bien'
    }else{
        iconoAsignado = iconoMal;
        textoPuntos.className = ('texto-puntos-mal')
        puntosTitulo.className = 'texto-mal'
    }
    iconoInsertadoDiv.innerHTML = iconoAsignado;
    textoPuntos.textContent = puntos;
}

const contenedor = document.getElementById('respuestaValidacion');

// Crear el div de validacion
var validacionDiv = document.createElement('div');
validacionDiv.className = 'validacion'; // Agrega la clase de animación

// Loader
var loaderDiv = document.createElement('div');
loaderDiv.className = 'loader-validacion';
// loaderDiv.innerHTML = `<div class="loader"></div>`;
loaderDiv.innerHTML = `
    <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
`;
validacionDiv.appendChild(loaderDiv);

// Icono
var iconoDiv = document.createElement('div');
iconoDiv.id = 'contenedorIconoCalificacion';
iconoDiv.className = 'icono position-absolute top-50 start-50 translate-middle';

var iconoInsertadoDiv = document.createElement('div');
iconoInsertadoDiv.className = 'icono-insertado';
iconoDiv.appendChild(iconoInsertadoDiv);

validacionDiv.appendChild(iconoDiv);

// Crear el div de puntuacion
var puntuacionDiv = document.createElement('div');
puntuacionDiv.className = 'puntuacion'; // Agrega la clase de animación

var puntosTitulo = document.createElement('h4');
puntosTitulo.textContent = 'PUNTOS';
puntuacionDiv.appendChild(puntosTitulo);

var textoPuntos = document.createElement('h4');
textoPuntos.id = 'textoPuntos';
textoPuntos.className = 'texto-puntos';
puntuacionDiv.appendChild(textoPuntos);

// Insertar los elementos div en el div con id respuestaValidacion
contenedor.appendChild(validacionDiv);
contenedor.appendChild(puntuacionDiv);

// Configurar la animación de loaderDiv
setTimeout(() => {
    loaderDiv.classList.add('animate__animated', 'animate__fadeOut');
    loaderDiv.addEventListener('animationend', () => {
        loaderDiv.style.opacity = '0';
    });
}, 5000); 

// Configurar las animaciones de puntuacionDiv e iconoInsertadoDiv
setTimeout(() => {
    puntuacionDiv.style.opacity = '1';
    iconoInsertadoDiv.style.opacity = '1';

    iconoInsertadoDiv.classList.add('animate__animated', 'animate__fadeIn');
    puntuacionDiv.classList.add('animate__animated', 'animate__bounceInUp');
}, 5300); 
