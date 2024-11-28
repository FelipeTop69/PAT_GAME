// Inyectar rondas en el HTML
function actualizarRondaHTML() {
    obtenerProgresoJugador().then(progreso => {
        console.log('Progreso obtenido:', progreso);

        if (progreso) {
            let {ronda} = progreso;
            const rondaElemento = document.getElementById('ronda-numero');
            if (rondaElemento) {
                rondaElemento.textContent = `Ronda ${ronda}`;
            } else {
                console.error('No se pudo encontrar el elemento de la ronda en el HTML.');
            }
        } else {
            console.log('No se pudo obtener el progreso del jugador.');
        }
    }).catch(error => {
        console.log('Error al avanzar la ronda:', error);
    });
}

// Funciones para interactuar con la base de datos
function obtenerProgresoJugador() {
    const url = '../Sistema rondas/php/ejecutarConsultas.php';

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

// Funcion para actualizar el progreso del jugador
function actualizarProgresoJugador(numerodocumento, nivel, ronda) {
    const url = '../Sistema rondas/php/ejecutarConsultas.php'; 

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