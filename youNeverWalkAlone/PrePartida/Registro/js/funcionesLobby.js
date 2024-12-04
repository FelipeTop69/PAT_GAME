const url = 'Registro/php/ejecutarConsultas.php';
const urlCerrarSesion = 'Registro/php/cerrarSesion.php';
const urlBandera = '../Bandera/ejecutarConsultas.php'
const btnSalir = document.getElementById('botonSalir');
const btnActualizarPoints = document.getElementById('botonActualizar');

const links = { 
    1: "../Partida/Categoria_Numeros/Detalles.html", 
    2: "../Partida/Categoria_Frutas/Detalles.html", 
    3: "../Partida/Categoria_Computo/Detalles.html" 
};

const alertJugador = {
    backdrop: 'rgba(0, 0, 0, 0.7)',
    html: `
        <div class="texto-alerta-jugador d-flex flex-column justify-content-between align-items-center p-2">
                <h6>PIENSA, AGILIZA Y TRIUNFA</h6>
                <h6>¿Ready para demostrar tu poder mental?</h6>
        </div>
        `,
    showConfirmButton: false,
    timer: 6500,
    timerProgressBar: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    stopKeydownPropagation: true,

    imageWidth: 120, // Ajusta el ancho de la imagen
    imageHeight: 120, // Ajusta la altura de la imagen
    imageAlt: 'Descripción de la imagen', // Texto alternativo

    customClass: {
        container: 'container-alerta-bienvenida',
        popup: 'popup-alerta-bienvenida',
        header: 'header-alerta-bienvenida',
        image: 'imagen-alerta-bienvenida',
        title: 'title-alerta-bienvenida',
        htmlContainer: 'htmlContainer-alerta-bienvenida',
        loader: 'loader-alerta-bienvenida',
        timerProgressBar: 'timerProgressBar-alerta-bienvenida',
        commonClass: 'animacion-elementos', 
    },

    // Animaciones para la clase
    showClass: {
        popup: `
			animate__animated
			animate__bounceInDown
			`
    },
    hideClass: {
        popup: `
			animate__animated
			animate__bounceOutDown
            animate__slow
			`
    },
};

function animarElementos() {
    const elementos = document.querySelectorAll('.animacion-elementos'); // Selecciona todos los elementos
    const animaciones = ['animate__jackInTheBox', 'animate__flipInX', 'animate__bounceIn']; // Animaciones para cada elemento

    let indexActual = 0;

    function animarSiguiente() {
        if (indexActual < elementos.length) {
            const elemento = elementos[indexActual];
            elemento.classList.add('animate__animated', animaciones[indexActual]); 
            elemento.style.opacity = 1; 

            // Cuando termine la animación actual, pasa al siguiente
            elemento.addEventListener('animationend', function handler() {
                elemento.removeEventListener('animationend', handler); 
                indexActual++;
                animarSiguiente(); // Llama a la animación del siguiente elemento
            });
        }
    }

    animarSiguiente(); // Inicia la primera animación
}

const mostrarJugador = () => {

    fetch(url,{
        method: 'POST',
        body: new URLSearchParams({'tipo_operacion' : 'perfil_jugador'})
    })
    .then(response => response.json())
    .then(data => {
        if(!data.error){
            console.log(data)
            Swal.fire({
                ...alertJugador,
                title: `¡Hola, ${data.nombre}!`,
                imageUrl: `${data.imagenurl}`,
                didOpen: () => {
                    // Agregar la clase común a los elementos específicos
                    document.querySelector('.swal2-image').classList.add(alertJugador.customClass.commonClass, 'animate__slow');
                    document.querySelector('.swal2-title').classList.add(alertJugador.customClass.commonClass);
                    document.querySelector('.swal2-html-container').classList.add(alertJugador.customClass.commonClass);
                    setTimeout(() => {
                        animarElementos(); 
                    }, 300); 
                },
            });
        }else{
            console.log(data.error)
        }
    })
    .catch(function(error){
        console.log('Error papi:', error)
    })

}

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

// El boton de esta fucncion se encuentra desabilidato (Boton de pruebas)
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
                // La configuracion de la alerta se encuentra en el script main.js
                ...alertConfigCerrar, 
                html: `
                    <div class="d-flex flex-column align-items-center g-2">
                        <span class="nombre-player"><b>${nombreJugador}</b> ¿Deseas salir?</span>
                        <span class="puntos-player"><b>Puntos:</b> ${puntosJugador}</span>
                    </div>
                `,
                iconHtml: '<img src="../assets/img/Iconos/IconoAlertaCerrarSesion.png" alt="iconoAlerta" class="icono-alerta">',
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


const verificarEstadoPartida = () =>{

    fetch(urlBandera, {
        method: 'POST',
        body: new URLSearchParams({
            'tipo_operacion' : 'verificar_estado_partida'
        })
    })
    .then(response => response.json())
    .then(data =>{
        if(data.mensaje === 'iniciar_partida'){
            
            fetch(urlBandera, {
                method: 'POST',
                body: new URLSearchParams({
                    'tipo_operacion' : 'seleccionar_categoria'
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.idcategoria){
                    console.log(data.idcategoria)
                    const categoryId = data.idcategoria; // Redirigir al enlace correspondiente si existe un ID de categoría válido 
                    if (categoryId && links[categoryId]) { 
                        window.location.href = links[categoryId]; 
                        // console.log(links[categoryId])
                    } else { 
                        console.error('ID de categoría no encontrado o no válido'); 
                    }
                }else{
                    console.log(data.error)
                }
            })
            .catch(function(error){
                console.log('Error papi:', error)
            })

        }else if(data.mensaje === 'En espera...'){
            // console.log(data.mensaje)
        }else{
            console.log(data.mensaje)
        }
    })
    .catch(function(error){
        console.log('Error papi:', error)
    })

}



document.addEventListener('DOMContentLoaded', () =>{
    // Esta funcion se encuentra desabilitada por ahora
    // btnActualizarPoints.addEventListener('click', actualizarPuntuacion);

    // mostrarJugador();

    btnSalir.addEventListener('click', cerrarSesion);
    setInterval(() => {
        listarJugadores()
    }, 3000);
    verificarEstadoPartida()
    setInterval(verificarEstadoPartida, 1000)
})


