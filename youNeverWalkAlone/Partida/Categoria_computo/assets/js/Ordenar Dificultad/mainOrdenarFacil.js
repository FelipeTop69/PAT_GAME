document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url)
    const computo = [
        'assets/img/Recursos/Elementos Memorizar/Altavoces.png',
        'assets/img/Recursos/Elementos Memorizar/USB.png',
        'assets/img/Recursos/Elementos Memorizar/Router.png',
        'assets/img/Recursos/Elementos Memorizar/Monitor.png',
    ];  // Frutas principales
    const computoAdicionales = obtenerComputoAdicionales(computo, 4);
    inyectarElementos(computo, contenedorDrag,  true);  // Inyectar los números principales
    inyectarElementos(computoAdicionales, contenedorDrag);  // Inyectar los números adicionales
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(computo)  
})
