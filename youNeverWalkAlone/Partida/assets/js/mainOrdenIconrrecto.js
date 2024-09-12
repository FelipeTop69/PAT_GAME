// Esperar 6 segundos (6000 ms) antes de ejecutar esta función
setTimeout(function() {
    // Seleccionar el elemento con la clase 'loader-validacion'
    const loader = document.querySelector('.loader-validacion');

    // Iniciar la transición de desvanecimiento
    if (loader) {
        loader.style.opacity = '0'; // Cambiar opacidad a 0 para comenzar el fade out

        // Después de la transición, eliminar el elemento del DOM (opcional)
        setTimeout(function() {
            loader.style.display = 'none'();
        }, 1000); // Esperar el tiempo de la transición (1s) antes de eliminarlo
    }
}, 4500);