// Temporizador
// Circular
let circularProgress = document.querySelector(".temporizador"),
    progressValue = document.querySelector(".tiempo-restante");

let seconds = 12; // Duración total en segundos
let progressEndValue = 360; // Grados totales del círculo
let framesPerSecond = 60; // Definir cuántos frames por segundo (FPS) quieres. 60 FPS es ideal para fluidez
let totalFrames = seconds * framesPerSecond; // Calcular cuántos "frames" en total habrá durante el tiempo de animación
let currentFrame = 0; // Frame inicial

let speed = 1000 / framesPerSecond; // Intervalo de tiempo entre frames en milisegundos

let progress = setInterval(() => {
    currentFrame++; // Incrementar el número de frame

    let elapsedSeconds = currentFrame / framesPerSecond; // Calcular los segundos transcurridos
    let remainingSeconds = (seconds - elapsedSeconds).toFixed(0); // Mostrar los segundos restantes con un decimal para mayor precisión
    progressValue.textContent = `${remainingSeconds}s`; // Actualizar el valor de los segundos mostrados

    let degrees = (elapsedSeconds / seconds) * progressEndValue; // Calcular los grados del círculo

    circularProgress.style.background = `conic-gradient(var(--azul-oscuro) ${degrees}deg, color-mix(in srgb, var(--color-negro) 30%, transparent) 0deg)`; // Actualizar el círculo

    if (currentFrame >= totalFrames) {
        clearInterval(progress); // Detener la animación cuando se alcanza el tiempo total
        progressValue.textContent = `0s`; // Mostrar 0 cuando termine
		window.location.href = "/Partida/Ordenar_Incorrecto.html";
    }
}, speed);



// DRAG AND DROP
let arreglo = ["", "", "", ""]

function arrastrar(event) {
    const target = event.target;
    target.classList.add('mantener');
    setTimeout(() => target.classList.add('invisible'), 0);
    event.dataTransfer.setData("text", target.id);
}

function finalizarArrastre(event) {
    const target = event.target;
    target.classList.remove('mantener', 'invisible');
    // Revertir la clase 'caja-activa' de las áreas de destino
    document.querySelectorAll('.caja').forEach(caja => caja.classList.remove('caja-activa'));
}

function permitirSoltar(evento) {
    evento.preventDefault();
}

let url = '';

function soltarElemento(evento) {
    const ocultarBoton = document.getElementById('botonOculto');
    
    if (arreglo[parseInt(evento.target.id)] == "") {
		
		var valorElemento = evento.dataTransfer.getData("text");

		arreglo[parseInt(evento.target.id)] = valorElemento;

		evento.target.appendChild(document.getElementById(valorElemento));
	}

	if (arreglo[0] != "" && arreglo[1] != "" && arreglo[2] != "" && arreglo[3] != "") {
		if (arreglo[0] == "numeroDos" && arreglo[1] == "numeroCinco" && arreglo[2] == "numeroTres" && arreglo[3] == "numeroSiete") {
            ocultarBoton.style.display = 'block';
            url = '/Partida/Ordenar_Valido.html'
            
		} else {
            ocultarBoton.style.display = 'block';
            url = '/Partida/Ordenar_Incorrecto.html'
            
		}
	}
}

function redirigir() {
    if (url) {
        window.location.href = url; // Redirige a la URL almacenada
    }
}

// Agrega el evento de clic al botón que debe redirigir
document.getElementById('botonEnviar').addEventListener('click', redirigir);


function entrarElemento(evento) {
    evento.preventDefault();
    // Marcar el área como válida para soltar
    if (evento.target.classList.contains('caja')) {
        evento.target.classList.add('caja-activa');
    }
}

function soltarArrastre(evento) {
    // Quitar la marca de área válida para soltar
    if (evento.target.classList.contains('caja')) {
        evento.target.classList.remove('caja-activa');
    }
}