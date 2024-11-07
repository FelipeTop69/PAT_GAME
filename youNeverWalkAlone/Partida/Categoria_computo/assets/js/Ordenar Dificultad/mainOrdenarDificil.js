document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url)

    const computo = [
        'assets/img/Recursos/Elementos Memorizar/Proyector.png',
        'assets/img/Recursos/Elementos Memorizar/Microfono.png',
        'assets/img/Recursos/Elementos Memorizar/Disco Duro.png',
        'assets/img/Recursos/Elementos Memorizar/USB.png',
        'assets/img/Recursos/Elementos Memorizar/Diademas.png',
        'assets/img/Recursos/Elementos Memorizar/CPU.png',
        'assets/img/Recursos/Elementos Memorizar/Router.png',
        'assets/img/Recursos/Elementos Memorizar/Monitor.png',
    ]
    const computoAdicionales = obtenerComputoAdicionales(computo, 1);
    inyectarElementos(computo, contenedorDrag,  true);  // Inyectar los números principales
    inyectarElementos(computoAdicionales, contenedorDrag);  // Inyectar los números adicionales
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(computo)
})