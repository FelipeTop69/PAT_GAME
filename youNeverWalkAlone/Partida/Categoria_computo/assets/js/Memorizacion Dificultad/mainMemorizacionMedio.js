document.addEventListener('DOMContentLoaded', function () {

    // Llamamos a la función que actualiza el HTML    
    actualizarRondaHTML();

    iniciarBarraProgreso('#barraProgresoMedio', 10000, 'Ordenar Medio.html'); 
    const contenedorMemorizar = document.getElementById('contenedorMemorizarMedio')
    
    // Genera elementos aleatoriamente
    const imagenes = obtenerComputoParaRonda(6);

    // Guardar los elementos generados en el localStorage
    localStorage.setItem('computoMemorizados', JSON.stringify(imagenes));
    
    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})