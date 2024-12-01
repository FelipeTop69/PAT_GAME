const music = new Audio('../assets/multimedia/audio/admin/Lobby.mp3');
music.volume = 0.3; // Configuramos el volumen
music.loop = true; // Repetir automáticamente
music.autoplay = true; // Habilitamos el autoplay


function alternarSonido() {
    // Obtener el elemento
    var elemento = document.getElementById('sonido') || document.getElementById('pausa');

    // Verificar el ID actual y alternar
    if (elemento.id === 'sonido') {
        elemento.id = 'pausa'; // Cambia el ID a 'pausa'
        elemento.src = "../assets/img/sonido/sin sonido.png"; // Cambia la imagen
        console.log("Sonido apagado. ID cambiado a 'pausa'");
        detenerMusica(); // Detener música
    } else if (elemento.id === 'pausa') {
        elemento.id = 'sonido'; // Cambia el ID a 'sonido'
        elemento.src = "../assets/img/sonido/sonido.png"; // Cambia la imagen
        console.log("Sonido activado. ID cambiado a 'sonido'");
        reproducirMusica(); // Reproducir música
    }
}

function reproducirMusica() {
    music.play();
}

function detenerMusica() {
    music.pause();
    music.currentTime = 0; // Resetea la canción al inicio
}
