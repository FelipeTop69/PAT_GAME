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

    audioTemporizador(true)

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
            audioTemporizador(false)
            progressValue.textContent = `0s`; // Mostrar 0 cuando termine
            cancelAnimationFrame(animationFrame); // Detener la animación

            const overlay = document.querySelector('.overlay')

            if(overlay){
                document.body.removeChild(overlay);
            }else{
                console.log('No se dio click')
            } 

            localStorage.setItem('puntosRequeridos', computo.length * 100);

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
        audio = new Audio('../../assets/multimedia/audio/Temporizador Orden.mp3');
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

// Inyectar Elementos
const baseComputoAdicionales = [
    'assets/img/Recursos/Elementos Memorizar/Altavoces.png',
    'assets/img/Recursos/Elementos Memorizar/CPU.png',
    'assets/img/Recursos/Elementos Memorizar/Diademas.png',
    'assets/img/Recursos/Elementos Memorizar/Disco Duro.png',
    'assets/img/Recursos/Elementos Memorizar/Impresora.png',
    'assets/img/Recursos/Elementos Memorizar/Microfono.png',
    'assets/img/Recursos/Elementos Memorizar/Monitor.png',
    'assets/img/Recursos/Elementos Memorizar/Mouse.png',
    'assets/img/Recursos/Elementos Memorizar/Proyector.png',
    'assets/img/Recursos/Elementos Memorizar/Router.png',
    'assets/img/Recursos/Elementos Memorizar/Teclado.png',
    'assets/img/Recursos/Elementos Memorizar/USB.png',
];  // Base de computo adicionales
const idElementos = [];

// Función para seleccionar frutas principales para la ronda
function obtenerComputoParaRonda(cantidad) {
    const ComputoDisponibles = [...baseComputoAdicionales];
    const seleccionadas = [];

    for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * ComputoDisponibles.length);
        seleccionadas.push(ComputoDisponibles[indiceAleatorio]);
        ComputoDisponibles.splice(indiceAleatorio, 1);
    }

    return seleccionadas;
}

// Función para obtener frutas adicionales, excluyendo las ya seleccionadas
function obtenerComputoAdicionales(computo, cantidad) {
    const ComputoDisponibles = baseComputoAdicionales.filter(compu => !computo.includes(compu));
    const seleccionadas = [];

    for (let i = 0; i < cantidad && ComputoDisponibles.length > 0; i++) {
        const indiceAleatorio = Math.floor(Math.random() * ComputoDisponibles.length);
        seleccionadas.push(ComputoDisponibles[indiceAleatorio]);
        ComputoDisponibles.splice(indiceAleatorio, 1);
    }

    return seleccionadas;
}

// Inyectar elementos
function inyectarElementos(pElementos, pContenedor, esPrincipal = false) {
    const elementosRecibidos = pElementos;
    const contenedor = pContenedor;

    if (esPrincipal) {
        contenedor.innerHTML = '';
        idElementos.length = 0;
    }

    let ultimoId = idElementos.length;

    for (let iteracion = 0; iteracion < elementosRecibidos.length; iteracion++) {
        const nuevoElemento = document.createElement('div');
        const nuevoId = 'elemento' + (ultimoId + 1); // Añade el id
        nuevoElemento.id = nuevoId;
        nuevoElemento.setAttribute('data-id', nuevoId);
        nuevoElemento.classList.add('elemento', 'elemento-ordenar'); // Añade las clases

        // Crea el elemento img
        const imgElemento = document.createElement('img');

        imgElemento.classList.add('medida-elemento'); // Añade la clase
        imgElemento.src = elementosRecibidos[iteracion]; // Añade el src
        imgElemento.alt = 'imagenCategoriaComputo'; // Añade el alt

        // Añade el img al div
        nuevoElemento.appendChild(imgElemento);

        // Añade el div al contenedor
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

botonEnviar.addEventListener('click', validarOrden);

let ordenJugador = [];
function iniciarDragAndDrop(pComputo){
    computo = pComputo
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
                return contenedorDrop.children.length < computo.length;
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

            if (computo.length === ordenJugador.length) {
                contenedorBoton.style.display = "block";
            } else {
                contenedorBoton.style.display = "none";
            }

            // Guardar el estado de ordenJugador en localStorage (opcional)
            localStorage.setItem('ordenJugador', JSON.stringify(ordenJugador));
        }
    });
}