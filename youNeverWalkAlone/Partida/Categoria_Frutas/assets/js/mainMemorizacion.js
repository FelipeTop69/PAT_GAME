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

// Inyectar Elementos
const baseFrutasAdicionales = [
  'assets/img/Recursos/Elementos Memorizar/Banana.png',
  'assets/img/Recursos/Elementos Memorizar/Cereza.png',
  'assets/img/Recursos/Elementos Memorizar/Coco.png',
  'assets/img/Recursos/Elementos Memorizar/Durazno.png',
  'assets/img/Recursos/Elementos Memorizar/Frambuesa.png',
  'assets/img/Recursos/Elementos Memorizar/Fresa.png',
  'assets/img/Recursos/Elementos Memorizar/Granadilla.png',
  'assets/img/Recursos/Elementos Memorizar/Guayaba.png',
  'assets/img/Recursos/Elementos Memorizar/Kiwi.png',
  'assets/img/Recursos/Elementos Memorizar/Limon.png',
  'assets/img/Recursos/Elementos Memorizar/Mango.png',
  'assets/img/Recursos/Elementos Memorizar/Manzana.png',
  'assets/img/Recursos/Elementos Memorizar/Melon.png',
  'assets/img/Recursos/Elementos Memorizar/Mora.png',
  'assets/img/Recursos/Elementos Memorizar/Naranja.png',
  'assets/img/Recursos/Elementos Memorizar/Pera.png',
  'assets/img/Recursos/Elementos Memorizar/Piña.png',
  'assets/img/Recursos/Elementos Memorizar/Sandia.png',
  'assets/img/Recursos/Elementos Memorizar/Uva.png'
];  // Base de frutas adicionales
const idElementos = [];

// Función para seleccionar frutas principales para la ronda
function obtenerFrutasParaRonda(cantidad) {
  const frutasDisponibles = [...baseFrutasAdicionales];
  const seleccionadas = [];

  for (let i = 0; i < cantidad; i++) {
      const indiceAleatorio = Math.floor(Math.random() * frutasDisponibles.length);
      seleccionadas.push(frutasDisponibles[indiceAleatorio]);
      frutasDisponibles.splice(indiceAleatorio, 1);
  }

  return seleccionadas;
}

// Actualizar las rondas en el HTML
function actualizarRondaHTML() {
  const rondaActual = localStorage.getItem('rondaActual') || '1';
  const rondaElemento = document.getElementById('ronda-numero');
  if (rondaElemento) {
      rondaElemento.textContent = `Ronda #${rondaActual}`;
  }
}

function inyectarElementosMemorizar(pElementos, pContendor) {
    const elementosRecibidios = pElementos;
    const contenedor = pContendor;

    // Limpiar el contenedor antes de inyectar nuevos elementos
    contenedor.innerHTML = '';
    idElementos.length = 0;

    for (let iteracion = 0; iteracion < elementosRecibidios.length; iteracion++) {
        // Crea el elemento div
        const nuevoElemento = document.createElement('div');
        nuevoElemento.classList.add('elemento'); // Añade la clase

        const nuevoId = 'elemento' + (iteracion + 1); // Agregar el id a la caja que contiene la img
        nuevoElemento.id = nuevoId;
        nuevoElemento.setAttribute('data-id', nuevoId);

        // Crea el elemento img
        const imgElemento = document.createElement('img');
        imgElemento.classList.add('medida-elemento'); // Añade la clase
        imgElemento.src = elementosRecibidios[iteracion]; // Añade el src
        imgElemento.alt = 'imagenCategoriaFrutas'; // Añade el alt

        // Añade el img al div
        nuevoElemento.appendChild(imgElemento);

        // Añade el div al contenedor
        contenedor.appendChild(nuevoElemento);

        idElementos.push(nuevoElemento.id)
    }
}

