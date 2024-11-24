const url = 'Tabla Jugadores/php/ejecutarConsultas.php';
const urlCerrarSesion = '../PrePartida/Registro/php/cerrarSesion.php';
const urlContador = '../PrePartida/Registro/php/ejecutarConsultas.php';
const btnKill = document.getElementById('btnKill')
const audioBd = document.getElementById('auidoBD')

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

const actualizarContadorJugadores = () =>{

    fetch(urlContador, {
        method: 'POST',
        body: new URLSearchParams({'tipo_operacion' : 'contador_jugadores'})
    })
    .then(response => response.json())
    .then(data =>{
        if(data.jugadoresRegistrados.error){
            console.log(data.jugadoresRegistrados.error)
        }else{
            const campoContador = document.getElementById('contadorJugadores');
            campoContador.textContent = `${data.jugadoresRegistrados} de ${data.limiteJugadores}`
        }
    })
    .catch(function(error){
        console.log('Error papi:',error)
    })

}

// Función para mostrar los jugadores en la tabla HTML
const pintarTablaJugadores = (data) => {
    const tablaJugadores = document.querySelector('#tablaSeguimiento');
    tablaJugadores.innerHTML = "";

    if(data.length === 0){
        tablaJugadores.innerHTML = `
            <tr>
                <td colspan="4"><h6 class="text-center">No hay jugadores registrados</h6></td>
            </tr>
        `
    }else{
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
    }
};

// --------------------------------------------------------------------------//

btnKill.addEventListener('click', () => {

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Eliminar todos los Jugadores",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar todo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            audioBd.play();
            fetch(url,{
                method: 'POST',
                body: new URLSearchParams({
                    'tipo_operacion' : 'eliminar_todo'
                })
            })
            .then(response => response.json())
            .then (data =>{
                Swal.fire(
                    'Eliminado',
                    data.mensaje,
                    'success'
                );
            })
            .catch(function(error){
                console.log('Error Papi:', error)
            })
        }
    });

})

document.addEventListener('DOMContentLoaded', () =>{
    actualizarContadorJugadores();
    listarJugadores();
    setInterval(() => {
        actualizarContadorJugadores();
        listarJugadores();
    }, 3000)
})