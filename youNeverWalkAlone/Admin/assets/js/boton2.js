document.addEventListener('DOMContentLoaded', () => {
    const goToPageBtn = document.getElementById('goToPageBtn');

    if (goToPageBtn) {
        goToPageBtn.addEventListener('click', () => {
            // Establecer un valor en localStorage para indicar la modificación
            localStorage.setItem('modificarPaginaB', 'true');
            
            const selectedLink = goToPageBtn.getAttribute('data-link');
            console.log(`Enlace obtenido del botón: ${selectedLink}`); // Depuración

            if (selectedLink && selectedLink !== '#') {
                console.log(`Redirigiendo a: ${selectedLink}`);
                window.location.href = selectedLink; // Redirigir a la URL seleccionada
            } else {
                alert('No hay ninguna categoría seleccionada.');
                console.warn('No se encontró ningún enlace válido para la categoría seleccionada');
            }
        });
    } else {
        console.log('El botón goToPageBtn no se encontró en el DOM');
    }
});
