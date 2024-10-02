document.addEventListener('DOMContentLoaded', function () {
    const contenedorJugadores = document.getElementById('contenedorTabla');

    if(jugadores.length > 3){
        contenedorJugadores.classList.add('borde-tabla');
    }else{
        contenedorJugadores.classList.remove('borde-tabla');
    }

    
    asignarPosiciones();
    listarJugadores();
    animacionConfeti();
    // Detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', actualizarTexto);
    actualizarTexto();
})

// Animacion de Confeti
function animacionConfeti() {
    const duracion = 8 * 1000;
    const animationEnd = Date.now() + duracion;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft
            <= 0) {
            clearInterval(interval);
            return;
        }

        const particleCount = 50 * (timeLeft / duracion);


        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: {
                x: randomInRange(0.7, 0.9), y: Math.random() - 0.2
            }
        });
    }, 250);
}



// Funcinamiento Podio
//Listar jugadores en la tabla
function listarJugadores() {
    let cuerpoTabla = document.getElementById('cuerpoTabla');
    let filas = "";

    const imagenesExtra = ["https://i.ibb.co/8dvrph8/Medalla-Oro.png", "https://i.ibb.co/BPhsXfd/Medalla-Plata.png", "https://i.ibb.co/wwHP9CD/Medalla-Bronce.png"];

    jugadores.forEach((jugador, index) => {
        filas += `
            <tr>
                <td>#${jugador.posicion}</td>
                <td>${agregarMedallas(jugador, imagenesExtra, index)}</td>
                <td>${jugador.puntos}</td>
            </tr>
        `;
    });

    cuerpoTabla.innerHTML = filas;

    jugadores.forEach((jugador) => {
        if (jugador.posicion <= 3) {
            let filasTop3 = document.querySelector(`#cuerpoTabla tr:nth-child(${jugador.posicion})`)
            // Asignar el div correspondiente según la posición
            let divJugador = document.querySelector(`.contenedor-top-3 .jugador:nth-child(${jugador.posicion})`);

            if (divJugador && filasTop3) {
                // Insertar el avatar y el nombre en el div correspondiente
                const avatar = divJugador.querySelector('.avatar-jugador img');
                const nombreLugar = divJugador.querySelector('.nombre-jugador');

                avatar.src = jugador.avatar; // Asigna el avatar del jugador
                nombreLugar.textContent = jugador.nombre; // Asigna el nombre del jugador

                filasTop3.classList.add('fondo-top-3')
            }
        }
    });
}

function agregarMedallas(jugador, imagenesExtra, index) {
    return `
        <img src="${jugador.avatar}" alt="avatar">
        <h5>${jugador.nombre}</h5>
        ${jugador.posicion <= 3 ? `<img class="medalla-jugador pulse" src="${imagenesExtra[index]}" alt="imagen extra">` : ''}
    `;
}


// Ordenar jugadores por puntos y asignar posiciones
function asignarPosiciones() {
    jugadores.sort((mayorCantidadPuntos, menorCantidadPuntos) => menorCantidadPuntos.puntos - mayorCantidadPuntos.puntos);
    jugadores.forEach((jugador, indice) => {
        jugador.posicion = indice + 1;
    });
}

function actualizarTexto() {
    const columna = document.getElementById('columnaPosicion');
    const anchoPantalla = window.innerWidth;

    if (anchoPantalla < 600) {
        columna.textContent = 'N°';
    }else{
        columna.textContent = 'Posición';
    }
}



