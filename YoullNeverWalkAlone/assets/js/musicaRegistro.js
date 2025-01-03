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
    var musica = document.getElementById('musica');
    musica.play();
    musica.volume = 0.1; // 50% de volumen
}

function detenerMusica() {
    var musica = document.getElementById('musica');
    musica.pause();
    musica.currentTime = 0; // Resetea la canción al inicio
}
