document.addEventListener('DOMContentLoaded', function () {
    // Inyectar Iconos
    const iconoIdentifiacion =
        `
        <svg class="icono-label" xmlns="http://www.w3.org/2000/svg"    
            viewBox="0 0 24 24"  
            fill="none"  
            stroke="currentColor"  
            stroke-width="2"  
            stroke-linecap="round"  
            stroke-linejoin="round"  
            class="icon icon-tabler icons-tabler-outline icon-tabler-id-badge-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 12h3v4h-3z" />
                <path d="M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6" />
                <path d="M10 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                <path d="M14 16h2" /><path d="M14 12h4" />
        </svg>
        `

    const iconoControl =
        `
        <svg class="icono-label"  xmlns="http://www.w3.org/2000/svg"    
            viewBox="0 0 24 24"  
            fill="none"  
            stroke="currentColor"  
            stroke-width="2"  
            stroke-linecap="round"  
            stroke-linejoin="round"  
            class="icon icon-tabler icons-tabler-outline icon-tabler-device-gamepad-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 5h3.5a5 5 0 0 1 0 10h-5.5l-4.015 4.227a2.3 2.3 0 0 1 -3.923 -2.035l1.634 -8.173a5 5 0 0 1 4.904 -4.019h3.4z" />
                <path d="M14 15l4.07 4.284a2.3 2.3 0 0 0 3.925 -2.023l-1.6 -8.232" />
                <path d="M8 9v2" /><path d="M7 10h2" />
                <path d="M14 10h2" />
        </svg>
        `

    document.querySelector('#contenedorIconoIdentificacion').innerHTML = iconoIdentifiacion;
    document.querySelector('#contenedorIconoControl').innerHTML = iconoControl;

});

const btnVolver = document.querySelector('.boton-volver');

btnVolver.addEventListener('click', () => {
    window.location.href = 'Comienzo.html'
})

const music = new Audio('../assets/Multimedia/Audio/PrePartida/Comienzo.mp3');
music.volume = 0.6; // Configuramos el volumen
music.loop = true; // Repetir automáticamente
music.autoplay = true; // Habilitamos el autoplay


function alternarSonido() {
    // Obtener el elemento
    var elemento = document.getElementById('sonido') || document.getElementById('pausa');

    // Verificar el ID actual y alternar
    if (elemento.id === 'sonido') {
        elemento.id = 'pausa'; // Cambia el ID a 'pausa'
        elemento.src = "assets/img/Recursos/Sonido/sin sonido.png"; // Cambia la imagen
        console.log("Sonido apagado. ID cambiado a 'pausa'");
        detenerMusica(); // Detener música
    } else if (elemento.id === 'pausa') {
        elemento.id = 'sonido'; // Cambia el ID a 'sonido'
        elemento.src = "assets/img/Recursos/Sonido/sonido.png"; // Cambia la imagen
        console.log("Sonido activado. ID cambiado a 'sonido'");
        reproducirMusica(); // Reproducir música
    }
}

function reproducirMusica() {
    music.play();
}

function detenerMusica() {
    music.pause();
    music.currentTime = 0; // Resetea la canción al inicio
}

// Validacion de campos
// function camposCompletos() {
//     const camposRequeridos = document.querySelectorAll('input[required]');

//     // Iteracion de los campos en el doom
//     for (let campo of camposRequeridos) {
//         // Verifiacion para saber si el campo esta vacio
//         if (!campo.value.trim()) {
//             // Si el campo es vacio retorna false
//             return false;
//         }
//     }

//     return true;
// }

// function validarCampos() {
//     if (camposCompletos()) {
//         window.location.href = 'Lobby.html';
//         return false;
//     }
//     return true;
// }