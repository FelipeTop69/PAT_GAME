// Temporizador Circular

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
            color = "var(--color-dificultad-facil)"; // Primer color, más de la mitad del tiempo restante
        } else if (remainingTime > seconds * 0.3) {
            color = "var(--color-dificultad-media)"; // Segundo color, entre el 20% y el 50% del tiempo restante
        } else {
            color = "var(--color-dificultad-dificil)"; // Último color, menos del 20% del tiempo restante
        }

        // Actualizar el color y el progreso del círculo
        circularProgress.style.background = `conic-gradient(${color} ${degrees}deg, color-mix(in srgb, var(--color-negro) 30%, transparent) 0deg)`;

        if (elapsedTime >= seconds) { // Si el tiempo se ha agotado
            progressValue.textContent = `0s`; // Mostrar 0 cuando termine
            cancelAnimationFrame(animationFrame); // Detener la animación
            // window.location.href = "/Partida/Ordenar_Incorrecto.html"; // Redirigir a la página deseada
            window.location.href = url; // Redirigir a la página deseada
        } else {
            animationFrame = requestAnimationFrame(updateTimer); // Continuar la animación
        }
    }

    // Iniciar la animación con requestAnimationFrame
    animationFrame = requestAnimationFrame(updateTimer);
}




// DRAG AND DROP
function initDragAndDrop(config) {
    // Parámetros del config: 
    // config.arregloObjetivo: el arreglo objetivo correcto
    // config.numElementos: número de elementos
    // config.contenedor: contenedor de las áreas de destino (ID o clase)
    // config.botonEnviar: ID del botón que redirige
    // config.urls: objeto con URLs de redirección

    let arreglo = Array(config.numElementos).fill("");

    function arrastrar(event) {
        const target = event.target;
        target.classList.add('mantener');
        setTimeout(() => target.classList.add('invisible'), 0);
        event.dataTransfer.setData("text", target.id);
    }

    function finalizarArrastre(event) {
        const target = event.target;
        target.classList.remove('mantener', 'invisible');
        document.querySelectorAll(`.${config.contenedor}`).forEach(caja => caja.classList.remove('caja-activa'));
    }

    function permitirSoltar(evento) {
        evento.preventDefault();
    }

    function soltarElemento(evento) {
        const ocultarBoton = document.getElementById('botonOculto');

        if (arreglo[parseInt(evento.target.id)] == "") {
            var valorElemento = evento.dataTransfer.getData("text");
            arreglo[parseInt(evento.target.id)] = valorElemento;
            evento.target.appendChild(document.getElementById(valorElemento));
        }

        if (arreglo.every(val => val !== "")) { // Verificar que todos los elementos estén llenos
            if (JSON.stringify(arreglo) === JSON.stringify(config.arregloObjetivo)) {
                ocultarBoton.style.display = 'block';
                url = config.urls.correcto;
            } else {
                ocultarBoton.style.display = 'block';
                url = config.urls.incorrecto;
            }
        }
    }

    function entrarElemento(evento) {
        evento.preventDefault();
        if (evento.target.classList.contains(config.contenedor)) {
            evento.target.classList.add('caja-activa');
        }
    }

    function soltarArrastre(evento) {
        if (evento.target.classList.contains(config.contenedor)) {
            evento.target.classList.remove('caja-activa');
        }
    }

    function redirigir() {
        if (url) {
            window.location.href = url;
        }
    }

    // Asociar eventos a los elementos de arrastre y áreas de destino
    document.querySelectorAll('.arrastrable').forEach(item => {
        item.addEventListener('dragstart', arrastrar);
        item.addEventListener('dragend', finalizarArrastre);
    });

    document.querySelectorAll(`.${config.contenedor}`).forEach(area => {
        area.addEventListener('dragover', permitirSoltar);
        area.addEventListener('drop', soltarElemento);
        area.addEventListener('dragenter', entrarElemento);
        area.addEventListener('dragleave', soltarArrastre);
    });

    document.getElementById(config.botonEnviar).addEventListener('click', redirigir);
}