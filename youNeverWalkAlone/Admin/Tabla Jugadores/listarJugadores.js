const url = 'Tabla Jugadores/php/ejecutarConsultas.php';

const  listarJugadores = () => {

    fetch(url,{
        method: 'POST',
        body: new URLSearchParams({
            'tipo_operacion': 'listar_jugadores'
        })
    })
    .then(response => response.json())
    .then(data =>{
        pintarTablaJugadores(data)
        // console.log(data)
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

// Función para mostrar los jugadores en la tabla HTML
const pintarTablaJugadores = (data) => {
    const tablaJugadores = document.querySelector('#tablaLobby');
    tablaJugadores.innerHTML = "";

    if(data.length === 0){
        tablaJugadores.innerHTML = `
            <tr>
                <td colspan="3"><h6 class="text-center">No hay jugadores registrados</h6></td>
            </tr>
        `
    }else{
        data.forEach((jugador, contador) => {
            tablaJugadores.innerHTML += `
                <tr>
                    <th>${contador + 1}</th>
                    <td>${jugador.nombre}</td>
                    <td><img class="img-fluid avatar" src="${jugador.imagenurl}" alt="avatar"></td>
                </tr>
            `;
        });
    }

    
};

document.addEventListener('DOMContentLoaded', () =>{
    setInterval(() => {
        listarJugadores();
    }, 3000)
})