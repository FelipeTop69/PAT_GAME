document.addEventListener('DOMContentLoaded', function () {

    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../../Partida/Ordenar_ValidacionComputo.html";
    iniciarTemporizador(segundos, url)

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
