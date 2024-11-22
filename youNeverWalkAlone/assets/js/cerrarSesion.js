const btnSalir = document.querySelector('#botonVolver');

// Función para cerrar la sesión, mostrar alerta y eliminar al jugador
const cerrarSesion = () => {
    fetch('../Sistema Puntuacion/php/ejecutarConsultas.php', {
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
            // console.log(nombreJugador)
            // console.log(puntosJugador)

            Swal.fire({
                // La configuracion de la alerta se encuentra en el script main.js
                ...alertConfigCerrar, 
                html: `
                    <div class="d-flex flex-column align-items-center g-2">
                        <span class="nombre-player"><b>${nombreJugador}</b> ¿Deseas salir?</span>
                        <span class="puntos-player"><b>Puntos:</b> ${puntosJugador}</span>
                    </div>
                `,
                iconHtml: '<img src="../../assets/img/Iconos/IconoAlertaCerrarSesion.png" alt="iconoAlerta" class="icono-alerta">',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch('../../PrePartida/Registro/php/cerrarSesion.php', {
                        method: 'POST'
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            document.body.style.opacity = 0;
                            setTimeout(() => {
                                window.location.href = '../../PrePartida/Comienzo.html';
                            }, 500)
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
    if (btnSalir) {
        btnSalir.addEventListener('click', cerrarSesion);
    } else {
        console.log('Botón de alerta no econtrado.');
    }
})
    
    