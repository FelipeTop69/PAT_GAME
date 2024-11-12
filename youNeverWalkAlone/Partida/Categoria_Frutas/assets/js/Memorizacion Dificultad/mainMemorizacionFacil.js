document.addEventListener('DOMContentLoaded', function () {

    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    
    iniciarBarraProgreso('#barraProgresoFacil', 8000, 'Ordenar.html');  
    const contenedorMemorizar = document.getElementById('contenedorMemorizarFacil')
    
    // Genera elementos aleatoriamente
    const imagenes = obtenerFrutasParaRonda(4);

    // Guardar los elementos generados en el localStorage
    localStorage.setItem('frutasMemorizadas', JSON.stringify(imagenes));

    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})