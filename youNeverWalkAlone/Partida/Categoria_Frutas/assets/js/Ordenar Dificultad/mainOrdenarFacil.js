document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url)
    const frutas = [
        'assets/img/Recursos/Elementos Memorizar/Coco.png',
        'assets/img/Recursos/Elementos Memorizar/Banana.png',
        'assets/img/Recursos/Elementos Memorizar/Cereza.png',
        'assets/img/Recursos/Elementos Memorizar/Mango.png'
    ];  // Frutas principales
    const frutasAdicionales = obtenerFrutasAdicionales(frutas, 4);
    inyectarElementos(frutas, contenedorDrag,  true);  // Inyectar los números principales
    inyectarElementos(frutasAdicionales, contenedorDrag);  // Inyectar los números adicionales
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(frutas) 
})