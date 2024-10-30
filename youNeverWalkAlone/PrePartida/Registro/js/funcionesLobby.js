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

btnActualizarPoints.addEventListener('click', () =>{
    // Solicitar la nueva puntuación al jugador
    const nuevaPuntuacion = prompt("Ingresa tu nueva puntuación:");
    
    if (nuevaPuntuacion && !isNaN(nuevaPuntuacion)) {
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
                    title: 'Puntuación Actualizada',
                    text: 'Tu puntuación ha sido actualizada correctamente'
                });
                listarJugadores();
            }
        })
        .catch(error => {
            console.log('Error al actualizar la puntuación:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la puntuación. Inténtalo de nuevo.'
            });
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Entrada no válida',
            text: 'Por favor, ingresa una puntuación válida.'
        });
    }
})

btnSalir.addEventListener('click', () =>{
    // Solicitar los puntos actualizados del jugador
    fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ 'tipo_operacion': 'obtener_puntos' })
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
            
            const nombreJugador = jugadorSesion.nombre;
            const puntosJugador = data.puntos;

            Swal.fire({
                ...alertConfig, 
                html:`<span>¿Deseas salir ${nombreJugador}? Puntos:${puntosJugador}</span>`,
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarJugadorYSalir();
                }
            });
            
        }
    })
    .catch(error => {
        console.log('Error al obtener los puntos actualizados:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron obtener los puntos actualizados. Inténtalo de nuevo.'
        });
    });


})

// Función para eliminar jugador y cerrar sesión
const eliminarJugadorYSalir = () => {
    fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ 'tipo_operacion': 'eliminar_jugador' }) // Llamada para eliminar el jugador
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
            // Proceder a cerrar sesión tras eliminar al jugador
            fetch(urlCerrarSesion, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Salida Exitosa',
                        text: data.message,
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        window.location.href = 'Comienzo.html';
                    });
                }
            })
            .catch(error => {
                console.log('Error al cerrar la sesión:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cerrar la sesión. Inténtalo de nuevo.'
                });
            });
        }
    })
    .catch(error => {
        console.log('Error al eliminar el jugador:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el jugador. Inténtalo de nuevo.'
        });
    });
};




document.addEventListener('DOMContentLoaded', () =>{
    setInterval(() => {
        listarJugadores()
    }, 3000);
})


