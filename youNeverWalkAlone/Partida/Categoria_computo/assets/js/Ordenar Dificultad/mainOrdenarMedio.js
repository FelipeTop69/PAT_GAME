document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url)

    const computo = [
        'assets/img/Recursos/Elementos Memorizar/Disco Duro.png',
        'assets/img/Recursos/Elementos Memorizar/Teclado.png',
        'assets/img/Recursos/Elementos Memorizar/Mouse.png',
        'assets/img/Recursos/Elementos Memorizar/Impresora.png',
        'assets/img/Recursos/Elementos Memorizar/Diademas.png',
        'assets/img/Recursos/Elementos Memorizar/CPU.png',
    ]  // Computo principales
    const computoAdicionales = obtenerComputoAdicionales(computo, 3);
    inyectarElementos(computo, contenedorDrag,  true);  // Inyectar los números principales
    inyectarElementos(computoAdicionales, contenedorDrag);  // Inyectar los números adicionales
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(computo) 
})
