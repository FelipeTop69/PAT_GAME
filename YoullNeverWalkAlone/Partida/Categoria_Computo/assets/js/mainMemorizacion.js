document.addEventListener('DOMContentLoaded', function () {
    
})

// Función general para la barra de progreso
function iniciarBarraProgreso(selectorBarra, duracion, urlRedireccion) {
  const barraProgreso = document.querySelector(selectorBarra);
  const maxProgreso = parseFloat(barraProgreso.dataset.max);
  let tiempoRestante = duracion// Tiempo restante en segundos

  let progresoActual = 0;
  let tiempoInicial = null;

  audioTemporizador(true)

  function actualizarProgreso(timestamp) {
    if (!tiempoInicial) tiempoInicial = timestamp; // Captura el tiempo inicial de la animación
    const tiempoTranscurrido = timestamp - tiempoInicial; // Calcula cuánto tiempo ha pasado

    // Calcula el progreso basado en el tiempo transcurrido y la duración total
    progresoActual = (tiempoTranscurrido / (duracion * 1000)) * maxProgreso;

    // Actualiza el tiempo restante
    tiempoRestante = Math.max(0, ((duracion * 1000 - tiempoTranscurrido) / 1000).toFixed(0));

    if (tiempoRestante <= 2 && tiempoRestante > 0) { // Si quedan 5 segundos
      reducirVolumenAudio(window.music, 20000); // Reducir volumen en 5 segundos
    }

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

function reducirVolumenAudio(audio, duracion) {
  const pasos = 20; // Cantidad de pasos para reducir el volumen
  const intervalo = duracion / pasos; // Tiempo entre cada reducción
  const decremento = audio.volume / pasos; // Cantidad a reducir en cada paso

  let contador = 0;

  const intervaloReducir = setInterval(() => {
    if (contador >= pasos || audio.volume <= 0) {
      audio.volume = 0; // Asegurarse de que el volumen sea exactamente 0
      clearInterval(intervaloReducir); // Detener el intervalo
    } else {
      audio.volume = Math.max(0, audio.volume - decremento); // Reducir el volumen gradualmente
      contador++;
    }
  }, intervalo);
}

let audio = null; 
function audioTemporizador(pActivacion) {
  if (!audio) {
    audio = new Audio('../../assets/Multimedia/Audio/Juego/Temporizador Memo.mp3');
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

// Inyectar elementos
const idElementos = [];
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
];

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

// Inyectar elementos
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
        imgElemento.alt = 'imagenCategoriaComputo'; // Añade el alt

        // Añade el img al div
        nuevoElemento.appendChild(imgElemento);

        // Añade el div al contenedor
        contenedor.appendChild(nuevoElemento);

        idElementos.push(nuevoElemento.id)
    }
}

