document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    
    const indicador = 'ordenarmedio';  // El valor del indicador

    obtenerTiempos(indicador)
        .then(tiempoAsignado => {
            // Validación: Si tiempoAsignado es 0, null, o undefined, no llamar a iniciarBarraProgreso
            if (tiempoAsignado > 0 && tiempoAsignado != null) {
                const url = "../../Partida/Ordenar_Validacion.html";
                iniciarTemporizador(tiempoAsignado,url);
            } else {
                console.log("El tiempo asignado es 0 o no está disponible, no se inicia la barra de progreso.");
            }
        })
        .catch(error => {
            console.error("Error al obtener el tiempo:", error);
        });

    // Recupera los números memorizados de localStorage
    const numerosMemorizados = JSON.parse(localStorage.getItem('numerosMemorizados')) || [];
    
    // Genera números adicionales excluyendo los de `numerosMemorizados`
    const numerosAdicionales = obtenerNumerosAdicionales(numerosMemorizados, 3);
    const claseAdicional = ['nada'];

    // Inyecta los elementos en el contenedor de ordenamiento
    inyectarElementos(numerosMemorizados, contenedorDrag, claseAdicional, true); // Números memorizados
    inyectarElementos(numerosAdicionales, contenedorDrag);                       // Números adicionales

    // Mezcla los elementos para hacer el ordenamiento menos predecible
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(numerosMemorizados);
});