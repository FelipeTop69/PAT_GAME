function anuncioGanadores() {
    const title = document.querySelector('.title-ganadores')
    const primerLugar = document.querySelector('.primer-lugar-ganador')
    const segundoLugar = document.querySelector('.segundo-lugar-ganador')
    const tercerLugar = document.querySelector('.tercer-lugar-ganador')

    setTimeout(() => {
        configAudioTop3();
        title.classList.remove('opacidad');
        title.classList.add('animate__zoomIn');
        title.style.setProperty('--animate-duration', '1s')
        title.addEventListener('animationend', function () {
            setTimeout(() => {
                tercerLugar.classList.remove('opacidad');
                tercerLugar.classList.add('animate__backInRight')
                tercerLugar.style.setProperty('--animate-duration', '1.5s')
                tercerLugar.addEventListener('animationend', function () {
                    setTimeout(() => {
                        segundoLugar.classList.remove('opacidad');
                        segundoLugar.classList.add('animate__backInLeft')
                        segundoLugar.style.setProperty('--animate-duration', '1.5s')
                        segundoLugar.addEventListener('animationend', function () {
                            setTimeout(() => {
                                primerLugar.classList.remove('opacidad');
                                primerLugar.classList.add('animate__backInUp')
                                primerLugar.style.setProperty('--animate-duration', '1.2s')
                                primerLugar.addEventListener('animationend', function () {
                                    handleMediaQueryChange(mediaQuery);
                                    primerLugar.classList.remove('animate__animted', 'animate__backInUp')
                                    primerLugar.style.animation = 'pulse-ganador 1s infinite';
                                    primerLugar.style.animationDelay = '0.1s'; // Agrega un retraso de 0.1 segundos
                                    setTimeout(() => {
                                        const overlay = document.getElementById('overlay');
                                        overlay.style.opacity = '0';
                                        overlay.addEventListener('transitionend', () => {
                                            overlay.style.display = 'none';
                                            // overlay.remove();
                                        });
                                    }, 6000); 
                                })
                            }, 2800);
                        })
                    }, 800);
                })
            }, 800);
        })
    }, 1000);
}

function configAudioTop3() {
    const audio1 = new Audio('../assets/Multimedia/Audio/Podio/Top-3.mp3');
    const audio2 = new Audio('../assets/Multimedia/Audio/Podio/Ganador.mp3');
    const title = document.querySelector('.title-ganadores')

    function ejecutarDuranteIntervalo() {
        title.classList.add('esperandoPrimerLugar')
        // title.classList.add('malViajado')
    }

    audio1.muted = true;
    audio1.play()
        .then(() => {
            audio1.muted = false;
            audio1.volume = 0.2;
        })
        .catch((error) => {
            console.error('Error al reproducir el primer audio:', error);
        });

    // Cuando termine el primer audio, reproducir el segundo
    audio1.addEventListener('ended', () => {
        audio2.muted = true; // Configuración inicial para el segundo audio
        audio2.play()
            .then(() => {
                audio2.muted = false;
                audio2.volume = 0.2;

                const intervaloInicio = 0; // Inicio del intervalo en segundos
                const intervaloFin = 2.5;    // Fin del intervalo en segundos

                function verificarIntervalo() {
                    if (audio2.currentTime >= intervaloInicio && audio2.currentTime <= intervaloFin) {
                        ejecutarDuranteIntervalo();
                    } else if (audio2.currentTime > intervaloFin) {
                        audio2.removeEventListener('timeupdate', verificarIntervalo);
                        const elemento = document.querySelector('.esperandoPrimerLugar');
                        // const elemento = document.querySelector('.malViajado');
                        elemento.style.setProperty('animation-name', 'detener');
                    }
                }
                audio2.addEventListener('timeupdate', verificarIntervalo);
            })


            .catch((error) => {
                console.error('Error al reproducir el segundo audio:', error);
            });
    });
}


// Definir la media query
const mediaQuery = window.matchMedia('(max-width: 476px)');

function handleMediaQueryChange(e) {
    if (e.matches) {
        // Si el ancho de la pantalla es <= valor
        animacionConfetiUno();
    } else {
        // Si el ancho de la pantalla es > valor
        animacionConfetiDos();
    }
}

// Escuchar cambios en la media query
mediaQuery.addEventListener('change', handleMediaQueryChange);


// Animacion de Confeti Uno
function animacionConfetiUno() {
    // Seleccionar el div y su canvas
    const topGanadoresDiv = document.querySelector('.contenedor-ganadores');
    const confettiCanvas = topGanadoresDiv.querySelector('.confetti-canvas');

    // Configurar el tamaño del canvas
    confettiCanvas.width = topGanadoresDiv.offsetWidth;
    confettiCanvas.height = topGanadoresDiv.offsetHeight;

    // Crear una instancia de confetti específica para el canvas
    const myConfetti = confetti.create(confettiCanvas, { resize: true });

    // Configurar duración y opciones
    const duracion = 8 * 1000;
    const animationEnd = Date.now() + duracion;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        const particleCount = 50 * (timeLeft / duracion);

        myConfetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        myConfetti({
            ...defaults,
            particleCount,
            origin: {
                x: randomInRange(0.7, 0.9),
                y: Math.random() - 0.2
            }
        });
    }, 250);
}

// Animacion de Confeti Dos
function animacionConfetiDos() {
    // Seleccionar el contenedor y su canvas
    const topGanadoresDiv = document.querySelector('.contenedor-ganadores');
    const confettiCanvas = topGanadoresDiv.querySelector('.confetti-canvas');

    // Ajustar tamaño del canvas
    confettiCanvas.width = topGanadoresDiv.offsetWidth;
    confettiCanvas.height = topGanadoresDiv.offsetHeight;

    // Crear instancia de confetti limitada al canvas
    const myConfetti = confetti.create(confettiCanvas, { resize: true });

    // Configuración del confeti
    const end = Date.now() + (6 * 1000); // Duración total de 8 segundos
    const colors = ['#39b6b8', '#19d92c']; // Colores personalizados

    // Función de animación
    (function frame() {
        myConfetti({
            particleCount: 2,       // Pocas partículas por iteración
            angle: 60,             // Ángulo hacia la izquierda
            spread: 55,            // Dispersión
            origin: { x: 0 },      // Origen en el lado izquierdo
            colors: colors,        // Colores personalizados
        });
        myConfetti({
            particleCount: 2,       // Pocas partículas por iteración
            angle: 120,            // Ángulo hacia la derecha
            spread: 55,            // Dispersión
            origin: { x: 1 },      // Origen en el lado derecho
            colors: colors,        // Colores personalizados
        });

        // Continuar la animación mientras el tiempo no haya terminado
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}



function actualizarTexto() {
    const columna = document.getElementById('columnaPosicion');
    const anchoPantalla = window.innerWidth;

    if (anchoPantalla < 600) {
        columna.textContent = 'N°';
    } else {
        columna.textContent = 'Posición';
    }
}

const url = './Jugadores/ejecutarConsultas.php';

let jugadores = [];

const imagenesExtra = [
    "assets/img/Recursos/Podio/Medalllas/Medalla-Oro.png",
    "assets/img/Recursos/Podio/Medalllas/Medalla-Plata.png",
    "assets/img/Recursos/Podio/Medalllas/Medalla-Bronce.png"
];


const listarJugadores = () => {
    fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ 'tipo_operacion': 'listar_jugadores' })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error
                }).then(() => {
                    window.location.href = "../PrePartida/Comienzo.html";
                });
            } else {
                jugadores = data;
                asignarPosiciones();
                mostrarJugadoresEnTabla();
            }
        })
        .catch(error => {
            console.error('Error al listar jugadores:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo listar los jugadores. Inténtalo de nuevo.'
            });
        });
};


const asignarPosiciones = () => {
    jugadores.sort((a, b) => b.puntuacion - a.puntuacion);
    jugadores.forEach((jugador, index) => {
        jugador.posicion = index + 1;
    });
};


const mostrarJugadoresEnTabla = () => {
    let cuerpoTabla = document.getElementById('cuerpoTabla');
    let filas = "";

    jugadores.forEach((jugador, index) => {
        filas += `
            <tr>
                <td>#${jugador.posicion}</td>
                <td>${agregarMedallas(jugador, imagenesExtra, index)}</td>
                <td>${jugador.puntuacion}</td>
            </tr>
        `;
    });

    cuerpoTabla.innerHTML = filas;

    jugadores.forEach(jugador => {
        if (jugador.posicion <= 3) {
            let filasTop3 = document.querySelector(`#cuerpoTabla tr:nth-child(${jugador.posicion})`);
            let divJugador = document.querySelector(`.contenedor-top-3 .jugador:nth-child(${jugador.posicion})`);
            let divJugadorGanador = document.querySelector(`.top-3-ganadores .jugador:nth-child(${jugador.posicion})`);

            if (divJugador && filasTop3 && divJugadorGanador) {
                const avatar = divJugador.querySelector('.avatar-jugador img');
                const nombreLugar = divJugador.querySelector('.nombre-jugador');

                const avatarGanador = divJugadorGanador.querySelector('.avatar-jugador-ganador img');
                const nombreLugarGanador = divJugadorGanador.querySelector('.nombre-jugador');

                avatar.src = jugador.imagenurl;
                nombreLugar.textContent = jugador.nombre;

                avatarGanador.src = jugador.imagenurl;
                nombreLugarGanador.textContent = jugador.nombre;

                filasTop3.classList.add('fondo-top-3');
            }
        }
    });
};

// Función para agregar medallas e imagen de avatar
const agregarMedallas = (jugador, imagenesExtra, index) => {
    return `
        <img src="${jugador.imagenurl}" alt="avatar" >
        <h5>${jugador.nombre}</h5>
        ${jugador.posicion <= 3 ? `<img class="medalla-jugador pulse" src="${imagenesExtra[index]}" alt="imagen extra">` : ''}
    `;
};

// Cargar jugadores al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    anuncioGanadores()
    const contenedorJugadores = document.getElementById('contenedorTabla');

    if (jugadores.length > 3) {
        contenedorJugadores.classList.add('borde-tabla');
    } else {
        contenedorJugadores.classList.remove('borde-tabla');
    }
    // Detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', actualizarTexto);
    actualizarTexto();
    listarJugadores();
    setInterval(() => {
        listarJugadores();
    }, 2000);
})



