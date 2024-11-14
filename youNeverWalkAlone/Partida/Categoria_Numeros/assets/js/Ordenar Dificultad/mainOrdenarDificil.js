document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "/Partida/Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url)
    const numeros = [5, 6, 0, 8, 2, 4, 9, 1];  // Números principales
    const numerosAdicionales = obtenerNumerosAdicionales(numeros, 1);
    const claseAdicional = ['nada']
    inyectarElementos(numeros, contenedorDrag, claseAdicional, true);  // Inyectar los números principales
    inyectarElementos(numerosAdicionales, contenedorDrag);  // Inyectar los números adicionales
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(numeros) 
})  