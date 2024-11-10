document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url)

    const frutas = [
        'assets/img/Recursos/Elementos Memorizar/Piña.png',
        'assets/img/Recursos/Elementos Memorizar/Pera.png',
        'assets/img/Recursos/Elementos Memorizar/Kiwi.png',
        'assets/img/Recursos/Elementos Memorizar/Guayaba.png',
        'assets/img/Recursos/Elementos Memorizar/Granadilla.png',
        'assets/img/Recursos/Elementos Memorizar/Uva.png',
        'assets/img/Recursos/Elementos Memorizar/Frambuesa.png',
        'assets/img/Recursos/Elementos Memorizar/Fresa.png',
    ]
    const frutasAdicionales = obtenerFrutasAdicionales(frutas, 1);
    inyectarElementos(frutas, contenedorDrag,  true);  // Inyectar los números principales
    inyectarElementos(frutasAdicionales, contenedorDrag);  // Inyectar los números adicionales
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(frutas) 
})