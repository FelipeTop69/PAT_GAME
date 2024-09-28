document.addEventListener('DOMContentLoaded', function(){
    // Registro de ejemplo de jugadores
    registrarJugador(1, 'Ruben Felipe', 1000);
    registrarJugador(2, 'Jugador 2', 900);
    registrarJugador(3, 'Jugador 3', 800);
    registrarJugador(4, 'Jugador 4', 700);
    registrarJugador(5, 'Jugador 5', 600);
    registrarJugador(6, 'Jugador 6', 500);
    registrarJugador(7, 'Jugador 7', 400);
    registrarJugador(8, 'Jugador 8', 300);
    registrarJugador(9, 'Jugador 9', 200);
    registrarJugador(10, 'Jugador 10', 100);
})

let jugadores = []; 

let avatares = [
    'https://i.ibb.co/j6QNFxP/Avatar-01.png',
    'https://i.ibb.co/Yczpsvm/Avatar-02.png',
    'https://i.ibb.co/m6dNW4c/Avatar-03.png',
    'https://i.ibb.co/jJ7pr1d/Avatar-04.png',
    'https://i.ibb.co/PW9bPSW/Avatar-05.png',
    'https://i.ibb.co/8xM1XDn/Avatar-06.png'
];

//Registrar un jugador
function registrarJugador(pId, pNombre, pPuntos) {
    const avatarAleatorio = avatares[Math.floor(Math.random() * avatares.length)];

    const jugador = {
        id: pId,
        nombre: pNombre,
        puntos: pPuntos,
        posicion: null,
        avatar: avatarAleatorio
    };
    jugadores.push(jugador);
}