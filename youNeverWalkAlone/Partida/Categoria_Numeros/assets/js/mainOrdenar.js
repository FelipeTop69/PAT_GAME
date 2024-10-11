// Temporizador Circular

let intervaloTiempoActual = "bajo"; 

function iniciarTemporizador(pTiempo, pDireccionUrl) {
    let circularProgress = document.querySelector(".temporizador"),
        progressValue = document.querySelector(".tiempo-restante");

    let seconds = pTiempo; // Duración total en segundos
    let url = pDireccionUrl;
    let progressEndValue = 360; // Grados totales del círculo
    let startTime = null; // Variable para almacenar el tiempo de inicio
    let animationFrame; // Variable para almacenar el requestAnimationFrame

    function updateTimer(timestamp) {
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
            progressValue.textContent = `0s`; // Mostrar 0 cuando termine
            cancelAnimationFrame(animationFrame); // Detener la animación

            // Se comento la Linea de abajo por que se declaro ordenJugador como variable global en la linea 135
            // let ordenJugador = JSON.parse(localStorage.getItem('ordenJugador')) || [];

            // Comprobar si el ordenJugador está vacío y asignar 0 puntos si es necesario
            if (ordenJugador.length === 0) {
                localStorage.setItem('puntos', 0);  // Asignar 0 puntos si el jugador no ha hecho nada
                localStorage.setItem('puntosRequeridos', numeros.length * 100);
            }else{
                // Si el tiempo se acaba, no asignar puntos extra
                localStorage.setItem('puntosExtra', 0);
            }

            // Redirigir a la página deseada
            window.location.href = url;
        } else {
            animationFrame = requestAnimationFrame(updateTimer); // Continuar la animación
        }
    }

    // Iniciar la animación con requestAnimationFrame
    animationFrame = requestAnimationFrame(updateTimer);
}



// Inyectar Elementos
const baseNumerosAdicionales = [1, 2, 3, 4, 5, 6, 7, 8, 9];  // Base de números adicionales
const idElementos = [];

// Función para obtener números adicionales
function obtenerNumerosAdicionales(numeros, cantidad) {
    // Filtrar los números adicionales
    const numerosDisponibles = baseNumerosAdicionales.filter(numero => !numeros.includes(numero));

    // Seleccionar aleatoriamente 'cantidad' de números
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

botonEnviar.addEventListener('click', validarOrden);

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