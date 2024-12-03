// Temporizador Circular

let intervaloTiempoActual = "bajo"; 

async function iniciarTemporizador(pTiempo, pDireccionUrl) {
    let circularProgress = document.querySelector(".temporizador"),
        progressValue = document.querySelector(".tiempo-restante");

    let seconds = pTiempo; // Duración total en segundos
    let url = pDireccionUrl;
    let progressEndValue = 360; // Grados totales del círculo
    let startTime = null; // Variable para almacenar el tiempo de inicio
    let animationFrame; // Variable para almacenar el requestAnimationFrame

    audioTemporizador(true, 1.25)

    async function updateTimer(timestamp) {
        if (!startTime) startTime = timestamp; // Establecer el tiempo inicial la primera vez que se ejecuta

        let elapsedTime = (timestamp - startTime) / 1000; // Calcular el tiempo transcurrido en segundos
        let remainingTime = (seconds - elapsedTime).toFixed(0); // Tiempo restante con redondeo
        progressValue.textContent = `${remainingTime}s`; // Mostrar segundos restantes

        // Calcular grados del círculo
        let degrees = (elapsedTime / seconds) * progressEndValue;

        // Cambiar color en función del tiempo restante
        let color;
        if (remainingTime > seconds * 0.6) {
            color = "var(--color-dificultad-facil)";
            intervaloActual = 'facil'; // Más del 60% del tiempo restante
        } else if (remainingTime > seconds * 0.3) {
            color = "var(--color-dificultad-media)";
            intervaloActual = 'medio'; // Entre el 30% y el 60%
        } else {
            color = "var(--color-dificultad-dificil)";
            intervaloActual = 'dificil'; // Menos del 30% del tiempo restante
        }

        // Actualizar el color y el progreso del círculo
        circularProgress.style.background = `conic-gradient(${color} ${degrees}deg, color-mix(in srgb, var(--color-negro) 30%, transparent) 0deg)`;

        if (elapsedTime >= seconds) { // Si el tiempo se ha agotado
            audioTemporizador(true)
            progressValue.textContent = `0s`; // Mostrar 0 cuando termine
            cancelAnimationFrame(animationFrame); // Detener la animación

            const overlay = document.querySelector('.overlay')

            if(overlay){
                document.body.removeChild(overlay);
            }else{
                console.log('No se dio click')
            }

            localStorage.setItem('puntosRequeridos', numeros.length * 100);
            // Redirigir a la página deseada
            window.location.href = url;

        } else {
            animationFrame = requestAnimationFrame(updateTimer); // Continuar la animación
        }
    }

    // Iniciar la animación con requestAnimationFrame
    animationFrame = requestAnimationFrame(updateTimer);
}

let audio = null; 
function audioTemporizador(pActivacion, pVelocidad = 1) {
    if (!audio) {
        audio = new Audio('../../assets/Multimedia/Audio/Juego/Temporizador Orden.mp3');
        audio.loop = true;
        audio.volume = 0;
        audio.currentTime = 0;
    }

    audio.playbackRate = pVelocidad;

    if (pActivacion) {
        audio.play().then(() => {
            let volume = 0;
            const maxVolume = 0.7;
            const fadeDuration = 2000; // Duración en ms
            const interval = 200; // Intervalo entre pasos
            const steps = fadeDuration / interval;
            const step = 1 / steps;

            const fadeIn = setInterval(() => {
                if (volume < maxVolume) {
                    volume = Math.min(volume + step, maxVolume);
                    audio.volume = volume;
                }   else {
                    clearInterval(fadeIn);
                }
            }, interval);
        }).catch((error) => {
            console.error('Error al reproducir el audio:', error);
        });
    } else {
        audio.pause();
        audio.currentTime = 0;
    }
}

const idElementos = [];

// Inyectar Elementos
const elementosNumeros = [1,2,3,4,5,6,7,8,9,0];

function obtenerElementosAleatorios(cantidad) {
    const elementosDisponibles = [...elementosNumeros];
    const seleccionados = [];

    for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * elementosDisponibles.length);
        seleccionados.push(elementosDisponibles[indiceAleatorio]);
        elementosDisponibles.splice(indiceAleatorio, 1);
    }
    console.log(seleccionados);
    return seleccionados;
}

// función para obtener números adicionales de manera aleatoria
function obtenerNumerosAdicionales(numerosMemorizados, cantidad) {
    const numerosDisponibles = elementosNumeros.filter(num => !numerosMemorizados.includes(num)); // Filtra para evitar duplicados
    const seleccionados = [];

    for (let i = 0; i < cantidad && numerosDisponibles.length > 0; i++) {
        const indiceAleatorio = Math.floor(Math.random() * numerosDisponibles.length);
        seleccionados.push(numerosDisponibles[indiceAleatorio]);
        numerosDisponibles.splice(indiceAleatorio, 1);
    }
    return seleccionados;
}

// Inyectar elementos
function inyectarElementos(pElementos, pContenedor, clases = [], esPrincipal = false) {
    const elementosRecibidos = pElementos;
    const contenedor = pContenedor;

    if (esPrincipal) {
        contenedor.innerHTML = '';
        idElementos.length = 0;
    }

    let ultimoId = idElementos.length;

    for (let iteracion = 0; iteracion < elementosRecibidos.length; iteracion++) {
        const nuevoElemento = document.createElement('div');
        const nuevoId = 'elemento' + (ultimoId + 1);
        nuevoElemento.id = nuevoId;
        nuevoElemento.setAttribute('data-id', nuevoId);
        nuevoElemento.classList.add('elemento', 'elemento-ordenar', ...clases);

        const h1Elemento = document.createElement('h1');
        h1Elemento.textContent = elementosRecibidos[iteracion];

        nuevoElemento.appendChild(h1Elemento)

        contenedor.appendChild(nuevoElemento);

        if (esPrincipal) {
            idElementos.push(nuevoElemento.id);
        }

        ultimoId++;
    }
}

// DRAG AND DROP
const cartaElementos = document.getElementById('cartaElementos')
cartaElementos.classList.add('drag-activo')

const contenedorDrag = document.getElementById('contenedorDrag');
const contenedorDrop = document.getElementById('contenedorDrop');
const contenedorBoton = document.getElementById('botonOculto');
const botonEnviar = document.getElementById('botonEnviar');

function cambiarOrdenElementos(pContenedor) {
    const contenedor = pContenedor;
    const elementos = Array.from(contenedor.children);

    // Ordenar aleatoriamente
    elementos.sort(() => Math.random() - 0.5);

    // Limpiar el contenedor y reordenar los elementos
    contenedor.innerHTML = '';
    elementos.forEach(elemento => contenedor.appendChild(elemento));
}

botonEnviar.addEventListener('click', () =>{
    validarOrden();
    audioTemporizador(false)
});

let ordenJugador = [];
function iniciarDragAndDrop(pNumeros){
    numeros = pNumeros
    Sortable.create(contenedorDrag, {
        group: {
            name: 'ordenar',
            put: false
        },
        sort: false,
        animation: 500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)', //easeOutQuart de https://easings.net/#
    });
    
    Sortable.create(contenedorDrop, {
        group: {
            name: 'ordenar',
            pull: false,
            put: function(evt) {
                // Bloquear si el número de elementos en contenedorDrop es igual al límite
                return contenedorDrop.children.length < numeros.length;
            }
        },
        swap: true,
        animation: 800,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)', //easeOutQuart de https://easings.net/#
        draggable: ".elemento-ordenar",
        handle: ".elemento-ordenar",

        onStart: function(){
            cartaElementos.classList.remove('drag-activo');
        },

        onEnd: function(){
            cartaElementos.classList.add('drag-activo');
        },
        
        // Cuando se reordenen los elementos en contenedorDrop
        onSort: function(evt) {
            const ordenJugador = Array.from(contenedorDrop.querySelectorAll('.elemento-ordenar'))
                .map(elemento => elemento.getAttribute('data-id'));

            if (numeros.length === ordenJugador.length) {
                contenedorBoton.style.display = "block";
            } else {
                contenedorBoton.style.display = "none";
            }

            // Guardar el estado de ordenJugador en localStorage (opcional)
            localStorage.setItem('ordenJugador', JSON.stringify(ordenJugador));
        }
    });
}

// ANTES DE ASGINAR PUNTOS 0 SI SE TERMINA EL TIEMPO
// function iniciarTemporizador(pTiempo, pDireccionUrl) {
//     let circularProgress = document.querySelector(".temporizador"),
//         progressValue = document.querySelector(".tiempo-restante");

//     let seconds = pTiempo; // Duración total en segundos
//     let url = pDireccionUrl;
//     let progressEndValue = 360; // Grados totales del círculo
//     let startTime = null; // Variable para almacenar el tiempo de inicio
//     let animationFrame; // Variable para almacenar el requestAnimationFrame

//     function updateTimer(timestamp) {
//         if (!startTime) startTime = timestamp; // Establecer el tiempo inicial la primera vez que se ejecuta

//         let elapsedTime = (timestamp - startTime) / 1000; // Calcular el tiempo transcurrido en segundos
//         let remainingTime = (seconds - elapsedTime).toFixed(0); // Tiempo restante con redondeo
//         progressValue.textContent = `${remainingTime}s`; // Mostrar segundos restantes

//         // Calcular grados del círculo
//         let degrees = (elapsedTime / seconds) * progressEndValue;

//         // Cambiar color en función del tiempo restante
//         let color;
//         if (remainingTime > seconds * 0.6) {
//             color = "var(--color-dificultad-facil)"; // Primer color, más de la mitad del tiempo restante
//         } else if (remainingTime > seconds * 0.3) {
//             color = "var(--color-dificultad-media)"; // Segundo color, entre el 20% y el 50% del tiempo restante
//         } else {
//             color = "var(--color-dificultad-dificil)"; // Último color, menos del 20% del tiempo restante
//         }

//         // Actualizar el color y el progreso del círculo
//         circularProgress.style.background = `conic-gradient(${color} ${degrees}deg, color-mix(in srgb, var(--color-negro) 30%, transparent) 0deg)`;

//         if (elapsedTime >= seconds) { // Si el tiempo se ha agotado
//             progressValue.textContent = `0s`; // Mostrar 0 cuando termine
//             cancelAnimationFrame(animationFrame); // Detener la animación
//             // window.location.href = "/Partida/Ordenar_Incorrecto.html"; // Redirigir a la página deseada
//             window.location.href = url; // Redirigir a la página deseada
//         } else {
//             animationFrame = requestAnimationFrame(updateTimer); // Continuar la animación
//         }
//     }

//     // Iniciar la animación con requestAnimationFrame
//     animationFrame = requestAnimationFrame(updateTimer);
// }

// onSort: function(evt) {
//     const ordenJugador = Array.from(contenedorDrop.querySelectorAll('.elemento-ordenar'))
//         .map(elemento => elemento.getAttribute('data-id'));

//     if (numeros.length === ordenJugador.length) {
//         contenedorBoton.style.display = "block";
//     } else {
//         contenedorBoton.style.display = "none";
//     }

    
// }