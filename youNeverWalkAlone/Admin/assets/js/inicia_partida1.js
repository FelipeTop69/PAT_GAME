document.addEventListener('DOMContentLoaded', () => {
    // Verificar si existe el valor de modificación en localStorage
    const modificar = localStorage.getItem('modificarPaginaB');
    
    if (modificar === 'true') {
        // Realizar la modificación deseada en la página
        document.body.style.backgroundColor = 'lightblue';
        document.body.innerHTML += '<h2>Modificación aplicada desde Página A</h2>';

        // Limpiar el valor para evitar que se aplique en recargas posteriores
        localStorage.removeItem('modificarPaginaB');
    }
});