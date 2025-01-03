const url = '../Obtencion Tiempos/php/ejecutarConsultas.php';

const obtenerTiempos = (pIndicador) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: new URLSearchParams({
                'tipo_operacion': 'obtener_tiempos'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.error
                }).then(() => {
                    window.location.href = "../../PrePartida/Comienzo.html";
                });
                reject('Error al obtener tiempos');
            } else {
                let indicador = pIndicador;
                let tiempoAsignado;

                // Busca el valor de la propiedad dinámica según el indicador
                data.forEach(tiempoBuscado => {
                    tiempoAsignado = tiempoBuscado[indicador];
                });

                // Resuelve la promesa con el valor de tiempoAsignado
                resolve(tiempoAsignado);
            }
        })
        .catch(error => {
            console.error('Error al obtener tiempos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pueden obtener los tiempos. Inténtalo de nuevo.'
            });
            reject(error);
        });
    });
}