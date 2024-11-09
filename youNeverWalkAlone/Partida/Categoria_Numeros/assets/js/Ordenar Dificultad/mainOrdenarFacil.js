document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    
    const segundos = 25;
    const url = "../../Partida/Ordenar_Validacion.html";
    iniciarTemporizador(segundos,url);

    // Recupera los números memorizados de localStorage
    const numerosMemorizados = JSON.parse(localStorage.getItem('numerosMemorizados')) || [];
    
    // Genera números adicionales excluyendo los de `numerosMemorizados`
    const numerosAdicionales = obtenerNumerosAdicionales(numerosMemorizados, 4);
    const claseAdicional = ['nada'];

    // Inyecta los elementos en el contenedor de ordenamiento
    inyectarElementos(numerosMemorizados, contenedorDrag, claseAdicional, true); // Números memorizados
    inyectarElementos(numerosAdicionales, contenedorDrag);                       // Números adicionales

    // Mezcla los elementos para hacer el ordenamiento menos predecible
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(numerosMemorizados);
});