document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url)
    const numeros = [1, 9, 4, 8, 0, 2];  // Números principales
    const numerosAdicionales = obtenerNumerosAdicionales(numeros, 3);
    const claseAdicional = ['nada']
    inyectarElementos(numeros, contenedorDrag, claseAdicional, true);  // Inyectar los números principales
    inyectarElementos(numerosAdicionales, contenedorDrag);  // Inyectar los números adicionales
    cambiarOrdenElementos(contenedorDrag);
    iniciarDragAndDrop(numeros) 
})