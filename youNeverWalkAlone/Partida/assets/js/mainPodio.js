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



function actualizarTexto() {
    const columna = document.getElementById('columnaPosicion');
    const anchoPantalla = window.innerWidth;

    if (anchoPantalla < 600) {
        columna.textContent = 'N°';
    }else{
        columna.textContent = 'Posición';
    }
}

const url = './Jugadores/ejecutarConsultas.php';

let jugadores = [];

const imagenesExtra = [
    "https://i.ibb.co/8dvrph8/Medalla-Oro.png",
    "https://i.ibb.co/BPhsXfd/Medalla-Plata.png",
    "https://i.ibb.co/wwHP9CD/Medalla-Bronce.png"
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

            if (divJugador && filasTop3) {
                const avatar = divJugador.querySelector('.avatar-jugador img');
                const nombreLugar = divJugador.querySelector('.nombre-jugador');

                avatar.src = jugador.imagenurl; 
                nombreLugar.textContent = jugador.nombre; 

                filasTop3.classList.add('fondo-top-3');
            }
        }
    });
};

// Función para agregar medallas e imagen de avatar
const agregarMedallas = (jugador, imagenesExtra, index) => {
    return `
        <img src="${jugador.imagenurl}" alt="avatar">
        <h5>${jugador.nombre}</h5>
        ${jugador.posicion <= 3 ? `<img class="medalla-jugador pulse" src="${imagenesExtra[index]}" alt="imagen extra">` : ''}
    `;
};

// Cargar jugadores al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const contenedorJugadores = document.getElementById('contenedorTabla');

    if(jugadores.length > 3){
        contenedorJugadores.classList.add('borde-tabla');
    }else{
        contenedorJugadores.classList.remove('borde-tabla');
    }
    animacionConfeti();
    // Detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', actualizarTexto);
    actualizarTexto();
    listarJugadores();
    setInterval(() => {
        listarJugadores();
    }, 2000); 
})



