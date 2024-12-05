function boton() {
    // Obtener el elemento de audio
    var sonido = document.getElementById('boton');

    // Reproducir el sonido
    sonido.play();
}

// var sonido = new audio("../multimedia/audio/admin/Registro.mp3");

const music = new Audio('../assets/multimedia/audio/admin/Registro');
music.play();