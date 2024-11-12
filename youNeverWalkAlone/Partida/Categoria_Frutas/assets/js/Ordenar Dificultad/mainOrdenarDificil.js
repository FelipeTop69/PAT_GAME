document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();

    const indicador = 'ordenardificil';  // El valor del indicador

    obtenerTiempos(indicador)
        .then(tiempoAsignado => {
            // Validación: Si tiempoAsignado es 0, null, o undefined, no llamar a iniciarBarraProgreso
            if (tiempoAsignado > 0 && tiempoAsignado != null) {
                const url = "../../Partida/Ordenar_ValidacionFrutas.html";
                iniciarTemporizador(tiempoAsignado,url);
            } else {
                console.log("El tiempo asignado es 0 o no está disponible, no se inicia la barra de progreso.");
            }
        })
        .catch(error => {
            console.error("Error al obtener el tiempo:", error);
        });

    // Recupera los números memorizados de localStorage
    const frutas = JSON.parse(localStorage.getItem('frutasMemorizadas')) || [];

    // Genera frutas adicionales excluyendo los de `frutas`
    const frutasAdicionales = obtenerFrutasAdicionales(frutas, 1);
    inyectarElementos(frutas, contenedorDrag,  true);  // Inyectar los números principales
    inyectarElementos(frutasAdicionales, contenedorDrag);  // Inyectar los números adicionales

    // Mezcla los elementos para hacer el ordenamiento menos predecible
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(frutas)
})