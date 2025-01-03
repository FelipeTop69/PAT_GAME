document.addEventListener('DOMContentLoaded', function () {

    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    
    const indicador = 'memorizarmedio';  // El valor del indicador

    obtenerTiempos(indicador)
        .then(tiempoAsignado => {
            // Validación: Si tiempoAsignado es 0, null, o undefined, no llamar a iniciarBarraProgreso
            if (tiempoAsignado > 0 && tiempoAsignado != null) {
                // Llamamos a la función solo si el tiempo es válido
                iniciarBarraProgreso('#barraProgresoMedio', tiempoAsignado, 'Ordenar Medio.html');
            } else {
                console.log("El tiempo asignado es 0 o no está disponible, no se inicia la barra de progreso.");
            }
        })
        .catch(error => {
            console.error("Error al obtener el tiempo:", error);
        });
        
    const contenedorMemorizar = document.getElementById('contenedorMemorizarMedio')
    
    // Genera elementos aleatoriamente
    const imagenes = obtenerFrutasParaRonda(6);

    // Guardar los elementos generados en el localStorage
    localStorage.setItem('frutasMemorizadas', JSON.stringify(imagenes));

    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})