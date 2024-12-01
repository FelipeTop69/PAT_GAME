document.addEventListener('DOMContentLoaded', function () {

})

// Función general para la barra de progreso
function iniciarBarraProgreso(selectorBarra, duracion, urlRedireccion) {
  const barraProgreso = document.querySelector(selectorBarra);
  const maxProgreso = parseFloat(barraProgreso.dataset.max);
  let tiempoRestante = duracion; // Tiempo restante en segundos

  let progresoActual = 0;
  let tiempoInicial = null;

  audioTemporizador(true)

  function actualizarProgreso(timestamp) {
    if (!tiempoInicial) tiempoInicial = timestamp; // Captura el tiempo inicial de la animación
    const tiempoTranscurrido = timestamp - tiempoInicial; // Calcula cuánto tiempo ha pasado

    // Calcula el progreso basado en el tiempo transcurrido y la duración total
    progresoActual = (tiempoTranscurrido / (duracion * 1000)) * maxProgreso; // Multiplicamos por 1000 para hacer la conversión interna

    // Actualiza el tiempo restante
    tiempoRestante = Math.max(0, ((duracion * 1000 - tiempoTranscurrido) / 1000).toFixed(0));

    // Asegúrate de que no pase del 100%
    if (progresoActual >= maxProgreso) {
      audioTemporizador(false)
      progresoActual = maxProgreso;
      tiempoRestante = 0; // Cuando llegue al máximo, el tiempo restante es 0
      window.location.href = urlRedireccion; // Redirige a la URL especificada
    } else {
      requestAnimationFrame(actualizarProgreso); // Sigue actualizando hasta llegar al 100%
    }

    // Actualiza el estilo de la barra de progreso y el tiempo restante
    barraProgreso.style.setProperty('--width', progresoActual);  // Actualiza la barra
    barraProgreso.dataset.label = `${tiempoRestante}s`;  // Actualiza el texto con tiempo restante
  }

  // Inicia la animación
  requestAnimationFrame(actualizarProgreso);
}

let audio = null; 
function audioTemporizador(pActivacion) {
  if (!audio) {
    audio = new Audio('../../assets/multimedia/audio/Temporizador Memo.mp3');
    audio.loop = true;
    audio.volume = 0;
    audio.currentTime = 0;
  }

  if (pActivacion) {
    audio.volume = 0.5
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

// let volume = audio.volume;
// const fadeDuration = 2000;
// const interval = 200;
// const steps = fadeDuration / interval;
// const step = 1 / steps;

// const fadeOut = setInterval(() => {
//   if (volume > 0) {
//     volume = Math.max(volume - step, 0);
//     audio.volume = volume;
//   } else {
//     clearInterval(fadeOut);
//     audio.pause();
//     audio.currentTime = 0;
//   }
// }, interval);

// Inyectar elementos
const idElementos = [];
const elementosNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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

function inyectarElementosMemorizar(pElementos, pContenedor, clases = []) {
  const elementosRecibidos = pElementos;
  const contenedor = pContenedor;

  contenedor.innerHTML = '';
  idElementos.length = 0;

  for (let iteracion = 0; iteracion < elementosRecibidos.length; iteracion++) {
    const nuevoElemento = document.createElement('div');
    const nuevoId = 'elemento' + (iteracion + 1);
    nuevoElemento.id = nuevoId;
    nuevoElemento.setAttribute('data-id', nuevoId);

    // Agregar las clases pasadas como parámetro
    nuevoElemento.classList.add('elemento', ...clases);

    nuevoElemento.textContent = elementosRecibidos[iteracion];

    contenedor.appendChild(nuevoElemento);

    idElementos.push(nuevoElemento.id);
  }
}
