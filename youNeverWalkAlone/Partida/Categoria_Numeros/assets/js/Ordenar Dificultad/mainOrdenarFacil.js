document.addEventListener('DOMContentLoaded', function () {
    
    // Configuracion Temporizador
    const segundos = 15;
    const url = "../Ordenar_Validacion.html";
    iniciarTemporizador(segundos, url);  // Iniciar temporizador
    const numeros = [4, 5, 8, 9];  // Números principales
    const numerosAdicionales = obtenerNumerosAdicionales(numeros, 4);
    const claseAdicional = ['nada'];

    // Inyectar los números principales
    inyectarElementos(numeros, contenedorDrag, claseAdicional, true);
    // Inyectar los números adicionales
    inyectarElementos(numerosAdicionales, contenedorDrag);
    // Cambiar orden de los elementos
    cambiarOrdenElementos(contenedorDrag);
    // Iniciar drag and drop
    iniciarDragAndDrop(numeros);
    
    const temporizadorInterval = setInterval(function() {
        if (tiempoRestante <= 0) {
            clearInterval(temporizadorInterval); // Detenemos el temporizador
            window.location.href = url = "../Ordenar_Validacion.html";  // Redirigir a la página deseada
        } else {
            console.log("Tiempo restante: " + tiempoRestante + " segundos");
            tiempoRestante--;  // Disminuir el tiempo restante
        }
    }, 1000);  // Se ejecuta cada segundo
});

