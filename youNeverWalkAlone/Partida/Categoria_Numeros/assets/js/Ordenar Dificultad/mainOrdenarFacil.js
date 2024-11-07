document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 15;
    const url = "../Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url)
    const numeros = [4, 5, 8, 9];  // Números principales
    const numerosAdicionales = obtenerNumerosAdicionales(numeros, 4);
    const claseAdicional = ['nada']
    inyectarElementos(numeros, contenedorDrag, claseAdicional, true);  // Inyectar los números principales
    inyectarElementos(numerosAdicionales, contenedorDrag);  // Inyectar los números adicionales
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(numeros)
})