document.addEventListener('DOMContentLoaded', function () {

    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    const indicador = 'ordenarmedio';  // El valor del indicador

    obtenerTiempos(indicador)
        .then(tiempoAsignado => {
            // Validación: Si tiempoAsignado es 0, null, o undefined, no llamar a iniciarBarraProgreso
            if (tiempoAsignado > 0 && tiempoAsignado != null) {
                const url = "../../Partida/Ordenar_validacionComputo.html";
                iniciarTemporizador(tiempoAsignado,url);
            } else {
                console.log("El tiempo asignado es 0 o no está disponible, no se inicia la barra de progreso.");
            }
        })
        .catch(error => {
            console.error("Error al obtener el tiempo:", error);
        });

    //recupera los computos memorizados de localStorage
    const computo = JSON.parse(localStorage.getItem('computoMemorizados')) || [];
    
    // genera computos adicionales excluyendo los de `computo`
    const computoAdicionales = obtenerComputoAdicionales(computo, 3);

    // inyecta los elementos en el contenedor de ordenamiento
    inyectarElementos(computo, contenedorDrag,  true);  // Inyectar los números principales
    inyectarElementos(computoAdicionales, contenedorDrag);  // Inyectar los números adicionales
    
    // mezcla los elementos para hacer el ordenamiento menos predecible
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(computo) 
})
