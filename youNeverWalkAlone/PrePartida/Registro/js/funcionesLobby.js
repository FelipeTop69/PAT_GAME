const url = 'Registro/php/ejecutarConsultas.php';
const urlCerrarSesion = 'Registro/php/cerrarSesion.php';
const btnSalir = document.getElementById('botonSalir');
const btnActualizarPoints = document.getElementById('botonActualizar');

const listarJugadores = () =>{

    const accion = new FormData();
    accion.append('tipo_operacion', 'listar_jugadores' )

    fetch(url,{
        method: 'POST',
        body: accion
    })
    .then(data => data.json())
    .then(data =>{

        if (data.error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.error
            }).then(() => {
                window.location.href = "Registro.html";
            });
        } else {
            pintarJugadores(data);
        }

    })
    .catch(function(error) {
        console.log('Error papi:', error)
    })

}

// Función para pintar la tabla de jugadores
const pintarJugadores = (jugadores) => {
    let contenedorJugadores = document.querySelector('#cartaJugadores');
    contenedorJugadores.innerHTML = "";

    for (let item of jugadores) {
        contenedorJugadores.innerHTML += 
        `
            <div class="jugador">
                <div class="avatar-jugador p-1">
                    <img class="img-fluid" src="${item.imagenurl}" alt="avatar" alt="avatar">
                </div>
                <div class="nombre-jugador">
                    ${item.nombre}
                </div>
            </div>
        `;
    }
};

// Función para actualizar la puntuación del jugador
const actualizarPuntuacion = () => {
    const nuevaPuntuacion = prompt("Ingresa la nueva puntuación:");

    if (nuevaPuntuacion) {
        fetch(url, {
            method: 'POST',
            body: new URLSearchParams({
                'tipo_operacion': 'actualizar_puntuacion_jugador',
                'nueva_puntuacion': nuevaPuntuacion
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.error
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Puntuación actualizada',
                    text: data.mensaje
                });
                listarJugadores(); // Refresca la tabla después de actualizar la puntuación
            }
        })
        .catch(error => {
            console.error('Error al actualizar la puntuación:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la puntuación. Inténtalo de nuevo.'
            });
        });
    }
};



// Función para cerrar la sesión, mostrar alerta y eliminar al jugador
const cerrarSesion = () => {
    fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ 'tipo_operacion': 'obtener_informacion_jugador' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.error
            });
        } else {
            const nombreJugador = data.nombre;
            const puntosJugador = data.puntuacion;

            Swal.fire({
                title: 'Confirmar Cierre de Sesión',
                html: `Jugador: <b>${nombreJugador}</b><br>Puntos: <b>${puntosJugador}</b>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Cerrar Sesión',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(urlCerrarSesion, {
                        method: 'POST'
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.status)
                        if (data.status === 'success') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Sesión cerrada',
                                text: data.message,
                                confirmButtonText: 'Aceptar'
                            }).then(() => {
                                window.location.href = 'Comienzo.html';
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error al cerrar la sesión:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo cerrar la sesión. Inténtalo de nuevo.'
                        });
                    });
                }
            });
        }
    })
    .catch(error => {
        console.error('Error al obtener los puntos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron obtener los puntos. Inténtalo de nuevo.'
        });
    });
};




document.addEventListener('DOMContentLoaded', () =>{
    btnActualizarPoints.addEventListener('click', actualizarPuntuacion);
    btnSalir.addEventListener('click', cerrarSesion);
    setInterval(() => {
        listarJugadores()
    }, 3000);
})


