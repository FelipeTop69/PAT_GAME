// Implementacion de la alerta en el boton volver
// Configuracion de la alerta
const alertConfig = {
    title: '¡ADVERTENCIA!',
    // text: ,
    icon: 'warning',
    confirmButtonText: 'Si, Salir',
    footer: '<span class="span-alerta">No podras volver a la partida</span>',
    // width: 
    // padding:
    // background:
    // grow:
    backdrop: true,
    timer: 6000,
    timerProgressBar: true,
    // toast:
    // position:
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,
    // input:
    // inputPlaceholder:
    // inputValue:
    // inputOptions:
    // Perzonalizar la clase segun mis clases
    customClass: {
        container: 'container-alerta',
        popup: 'popup-alerta',
        header: 'header-alerta',
        title: 'title-alerta',
        closeButton: 'closeButton-alerta',
        icon: 'icon-alerta',
        htmlContainer: 'htmlContainer-alerta',
        actions: 'actions-alerta',
        confirmButton: 'botones-alerta',
        cancelButton: 'botones-alerta',
        loader: 'loader-alerta',
        footer: 'footer-alerta',
        timerProgressBar: 'timerProgressBar-alerta',
    },
    // Animaciones para la clase
    showClass: {
        popup: `
			animate__animated
			animate__fadeInUpBig
			animate__faster
			`
    },
    hideClass: {
        popup: `
			animate__animated
			animate__fadeOutDownBig
			`
    },
    showConfirmButton: true,
    confirmButtonColor: '#d33',
    // confirmButtonAriaLabel:
    showCancelButton: true,
    cancelButtonText: 'No, Volver',
    cancelButtonColor: '#3085d6'
    // cancelButtonAriaLabel:
    // buttonsStyling:
    // showCloseButton:
    // closeButtonAriaLabel:
    // imageUrl:
    // imageWidth:
    // imageHeight:
    // imageAlt:
};

// Medotdo para invocar alerta
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
                ...alertConfig, 
                html: `
                    <div class="d-flex flex-column align-items-center g-2">
                        <span>¿<b>${nombreJugador}</b> estás seguro de salir?</span>
                        <span><b>Puntos:</b> ${puntosJugador}</span>
                    </div>
                `
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
    
    