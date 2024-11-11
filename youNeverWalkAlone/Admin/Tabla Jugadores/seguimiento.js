const url = 'Tabla Jugadores/php/ejecutarConsultas.php';

let jugadoresSeguimiento = [];


const  listarJugadores = () => {

    fetch(url,{
        method: 'POST',
        body: new URLSearchParams({
            'tipo_operacion': 'listar_jugadores'
        })
    })
    .then(response => response.json())
    .then(data =>{
        jugadoresSeguimiento = data;
        asignarPosiciones();
        pintarTablaJugadores(data)
    })
    .catch(error => {
        console.error('Error al listar jugadores:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo listar los jugadores. Inténtalo de nuevo.'
        });
    });
}

const asignarPosiciones = () => {
    jugadoresSeguimiento.sort((a, b) => b.puntuacion - a.puntuacion);
    jugadoresSeguimiento.forEach((jugador, index) => {
        jugador.posicion = index + 1;
    });
};

// Función para mostrar los jugadores en la tabla HTML
const pintarTablaJugadores = (data) => {
    const tablaJugadores = document.querySelector('#tablaSeguimiento');
    tablaJugadores.innerHTML = "";

    data.forEach(jugador => {
        tablaJugadores.innerHTML += `
            <tr>
                <th scope="row">#${jugador.posicion}</th>
                <td>${jugador.nombre}</td>
                <td>${jugador.puntuacion}</td>
                <td>${jugador.numerodocumento}</td>
            </tr>
        `;
    });
};

document.addEventListener('DOMContentLoaded', () =>{
    setInterval(() => {
        listarJugadores();
    }, 3000)
})