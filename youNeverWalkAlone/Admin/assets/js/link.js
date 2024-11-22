// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtener todos los switches
    const switches = document.querySelectorAll('.switch-checkbox');

    // Cargar el estado guardado de los switches desde el almacenamiento local
    switches.forEach((sw) => {
        const switchId = sw.getAttribute('data-id');
        const savedState = localStorage.getItem(`switch${switchId}State`);
        sw.checked = savedState === 'true';
        console.log(`Switch con ID ${switchId} cargado con estado: ${savedState}`);
    });

    // Añadir el evento de cambio a cada switch
    switches.forEach((sw) => {
        sw.addEventListener('change', function() {
            const switchId = this.getAttribute('data-id');
            const link = this.getAttribute('data-link'); // Obtén la URL del link

            // Si este switch está activado, desactiva los demás switches y guarda la URL
            if (this.checked) {
                switches.forEach(otherSw => {
                    if (otherSw !== this) {
                        otherSw.checked = false;
                        localStorage.setItem(`switch${otherSw.getAttribute('data-id')}State`, false);
                        console.log(`Switch ${otherSw.getAttribute('data-id')} desactivado`);
                    }
                });

                // Guardar la URL seleccionada en localStorage
                localStorage.setItem('selectedLink', link);
                console.log(`URL guardada en selectedLink: ${link}`);
            } else {
                // Si el switch se desactiva, no guardar la URL
                localStorage.removeItem('selectedLink');
                console.log('selectedLink eliminado del localStorage');
            }

            // Guardar el estado del switch actual
            localStorage.setItem(`switch${switchId}State`, this.checked);
            console.log(`Estado del switch ${switchId} guardado: ${this.checked}`);
        });
    });

    // Funcionalidad para redirigir al enlace guardado al presionar el botón
    const goToPageBtn = document.getElementById('goToPageBtn');
    if (goToPageBtn) {
        goToPageBtn.addEventListener('click', () => {
            console.log('Botón "Comenzar Partida" fue presionado');
            const savedLink = localStorage.getItem('selectedLink'); // Obtener la URL guardada

            if (savedLink) {
                console.log(`Redirigiendo a: ${savedLink}`);
                window.location.href = savedLink; // Redirigir a la URL guardada
            } else {
                // alert('No hay ninguna categoría seleccionada.');
                console.warn('No se encontró ninguna URL en localStorage');
            }
        });
    } else {
        console.warn('El botón goToPageBtn no se encontró en el DOM');
    }
});
