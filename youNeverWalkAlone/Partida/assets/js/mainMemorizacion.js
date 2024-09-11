document.addEventListener('DOMContentLoaded', function () {
    
})

const barraProgreso = document.querySelector('.barra-progreso');
const maxProgreso = parseFloat(barraProgreso.dataset.max);
const duracion = 8000; // Duración en milisegundos (5 segundos)
let tiempoRestante = duracion / 1000; // Tiempo restante en segundos

let progresoActual = 0;
let tiempoInicial = null;

function actualizarProgreso(timestamp) {
  if (!tiempoInicial) tiempoInicial = timestamp; // Captura el tiempo inicial de la animación
  const tiempoTranscurrido = timestamp - tiempoInicial; // Calcula cuánto tiempo ha pasado

  // Calcula el progreso basado en el tiempo transcurrido y la duración total
  progresoActual = (tiempoTranscurrido / duracion) * maxProgreso;

  // Actualiza el tiempo restante
  tiempoRestante = Math.max(0, ((duracion - tiempoTranscurrido) / 1000).toFixed(0));

  // Asegúrate de que no pase del 100%
  if (progresoActual >= maxProgreso) {
    progresoActual = maxProgreso;
    tiempoRestante = 0; // Cuando llegue al máximo, el tiempo restante es 0
	window.location.href = 'Ordenar.html';
  } else {
    requestAnimationFrame(actualizarProgreso); // Sigue actualizando hasta llegar al 100%
  }

  // Actualiza el estilo de la barra de progreso y el tiempo restante
  barraProgreso.style.setProperty('--width', progresoActual);  // Actualiza la barra
  barraProgreso.dataset.label = `${tiempoRestante}s`;  // Actualiza el texto con tiempo restante
}

// Inicia la animación
requestAnimationFrame(actualizarProgreso);