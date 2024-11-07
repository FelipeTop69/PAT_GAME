document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url)

    const frutas = [
        'assets/img/Recursos/Elementos Memorizar/Limon.png',
        'assets/img/Recursos/Elementos Memorizar/Manzana.png',
        'assets/img/Recursos/Elementos Memorizar/Mora.png',
        'assets/img/Recursos/Elementos Memorizar/Melon.png',
        'assets/img/Recursos/Elementos Memorizar/Sandia.png',
        'assets/img/Recursos/Elementos Memorizar/Coco.png',
    ]  // Frutas principales
    const frutasAdicionales = obtenerFrutasAdicionales(frutas, 3);
    inyectarElementos(frutas, contenedorDrag,  true);  // Inyectar los números principales
    inyectarElementos(frutasAdicionales, contenedorDrag);  // Inyectar los números adicionales
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(frutas) 
})