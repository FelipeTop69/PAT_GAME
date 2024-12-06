//RONDAS POR NIVELES
window.onload = () => {
    // Después de mostrar la puntuación, redirige de nuevo a Memorizacion.html
    setTimeout(() => {
        avanzarRonda();
    }, 8000); // Cambia el tiempo según sea necesario
};

function avanzarRonda() {
    obtenerProgresoJugador().then(progreso => {
        console.log('Progreso obtenido:', progreso);

        if (progreso) {
            let { nivel, ronda, numerodocumento } = progreso;

            // Determinar el nuevo nivel si la ronda es la última
            if (ronda < 2) {
                ronda++;
                console.log('ronda actual:', ronda);
                console.log('nivel actual:', nivel);
                redirigirSegunNivel(nivel);

            } else {
                //reiniciar la ronda y obtener el nuevo nivel
                ronda = 1;
                nivel= obtenerNuevoNivel(nivel)
                console.log(`ronda neiniciada en ${nivel} y aumentando de nivel a ${nivel}`)
            }

            //actualizar el progreso del jugador
            actualizarProgresoJugador(numerodocumento, nivel, ronda).then(() => {
                console.log(`Actualización de progreso realizada correctamente. ronda: ${ronda} nivel: ${nivel}`);
                if (nivel === 'completado') {
                    console.log('Nivel completado, redirigiendo a Podio.html');
                    const timePreRedireccion = 100; 
                    const redirrecion = 'PrePodio.html';
                    function startFadeOut() {
                        const overlay = document.getElementById('fadee-overlay');
                        const carta = document.getElementById('containerCarta');
                        if(overlay && carta){
                            carta.style.zIndex = '0'
                            overlay.style.opacity = 1;
                            setTimeout(() => {
                                window.location.href = redirrecion;
                            }, 2000);
                        }else{
                            console.log('No encontradoooo')
                        }
                    }
                    setTimeout(startFadeOut, timePreRedireccion);
                } else if (nivel === 'medio') {
                    console.log('Nivel medio, redirigiendo al detalle de la dificultad');
                    window.location.href = 'Dificultades/Dificultad Medio.php';
                } else if (nivel === 'dificil') {
                    console.log('Nivel dificil, redirigiendo al detalle de la dificultad');
                    window.location.href = 'Dificultades/Dificultad Dificil.php';
                }
            })
            .catch(error => {
                console.error('Error al actualizar el progreso:', error);
            });
        } else {
            console.log('No se pudo obtener el progreso del jugador.');
        }
    }).catch(error => {
        console.log('Error al avanzar la ronda:', error);
    });
}

function obtenerNuevoNivel(nivelActual) {
    if (nivelActual === 'facil') return 'medio';
    if (nivelActual === 'medio') return 'dificil';
    if (nivelActual === 'dificil') return 'completado';
    return 'completado';
}

function redirigirSegunNivel(nivel) {
    if (nivel === 'facil') {
        window.location.href = 'Categoria_Computo/Memorizacion.html';
    } else if (nivel === 'medio') {
        window.location.href = 'Categoria_Computo/Memorizacion Medio.html';
    } else if (nivel === 'dificil') {
        window.location.href = 'Categoria_Computo/Memorizacion Dificil.html';
    }
}


// Funciones para interactuar con la base de datos

function obtenerProgresoJugador() {
    const url = 'Sistema rondas/php/ejecutarConsultas.php';

    return fetch(url, {
        method: 'POST',
        body: new URLSearchParams({'tipo_operacion': 'obtener_progreso'})
    })
    .then(response => {
        console.log('Respuesta bruta:', response);
        return response.json(); // Convertir a JSON
    })
    .then(data => {
        console.log('Datos recibidos:', data); // Verificar los datos devueltos por el servidor

        if (!data.error) {
            if (data.nivel === null || data.ronda === null) {
                console.log('Datos nulos detectados, retornando valores por defecto');
                return { nivel: 'facil', ronda: 1, numerodocumento: data.numerodocumento };
            }
            return data; // Retornar los datos si todo está bien
        } else {
            console.error('Error del servidor:', data.error);
            throw new Error(data.error);
        }
    })
    .catch(error => {
        console.error('Error al obtener el progreso:', error);
    });
}

addEventListener('DOMContentLoaded', obtenerProgresoJugador);





function actualizarProgresoJugador(numerodocumento, nivel, ronda) {
    const url = 'Sistema rondas/php/ejecutarConsultas.php'; 

    const formData = new FormData();
    formData.append('numerodocumento', numerodocumento); 
    formData.append('nivel', nivel);                    
    formData.append('ronda', ronda);                     
    formData.append('tipo_operacion', 'actualizar_progreso'); 

    // Realizar la solicitud al servidor
    return fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos en actualizar progreso:', data);
        if (data.success) {
            console.log('Progreso actualizado correctamente:', data);
            return data; // Retorna los datos recibidos del servidor si es necesario
        } else {
            console.error('Error al actualizar el progreso:', data.error);
            throw new Error(data.error); // Manejar el error
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}

// addEventListener('DOMContentLoaded', actualizarProgresoJugador);