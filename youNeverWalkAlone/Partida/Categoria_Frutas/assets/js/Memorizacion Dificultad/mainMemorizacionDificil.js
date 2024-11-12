document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    
    iniciarBarraProgreso('#barraProgresoDificil', 12000, 'Ordenar Dificil.html');
    const contenedorMemorizar = document.getElementById('contenedorMemorizarDificil')
    
    // Genera elementos aleatoriamente
    const imagenes = obtenerFrutasParaRonda(8);

    // Guardar los elementos generados en el localStorage
    localStorage.setItem('frutasMemorizadas', JSON.stringify(imagenes));

    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})