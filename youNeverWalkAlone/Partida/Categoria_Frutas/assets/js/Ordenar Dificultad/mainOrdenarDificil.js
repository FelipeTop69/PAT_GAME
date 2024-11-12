document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../../Partida/Ordenar_ValidacionFrutas.html";
    iniciarTemporizador(segundos, url)

    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();

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