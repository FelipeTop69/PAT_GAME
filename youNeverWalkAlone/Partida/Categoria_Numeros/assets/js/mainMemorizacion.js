document.addEventListener('DOMContentLoaded', function () {
    
})

// Función general para la barra de progreso
function iniciarBarraProgreso(selectorBarra, duracion, urlRedireccion) {
  const barraProgreso = document.querySelector(selectorBarra);
  const maxProgreso = parseFloat(barraProgreso.dataset.max);
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

// Inyectar elementos
const idElementos = [];

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
