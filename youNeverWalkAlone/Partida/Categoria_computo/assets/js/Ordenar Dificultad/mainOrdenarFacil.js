document.addEventListener('DOMContentLoaded', function () {

    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();

    // Configuracion Temporizador
    const segundos = 20;
    const url = "../../Partida/ordenar_validacionComputo.html";
    iniciarTemporizador(segundos, url)

    // Recupera los números memorizados de localStorage
    const computo = JSON.parse(localStorage.getItem('computoMemorizados')) || [];
    // Genera computo adicionales excluyendo los de `computo`
    const computoAdicionales = obtenerComputoAdicionales(computo, 4);

    // Inyecta los elementos en el contenedor de ordenamiento
    inyectarElementos(computo, contenedorDrag,  true);  // Inyectar los números principales
    inyectarElementos(computoAdicionales, contenedorDrag);  // Inyectar los números adicionales
    
    // Mezcla los elementos para hacer el ordenamiento menos predecible
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(computo)  
})
