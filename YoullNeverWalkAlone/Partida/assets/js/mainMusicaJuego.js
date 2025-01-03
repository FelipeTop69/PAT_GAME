document.addEventListener('DOMContentLoaded', () => {
    const musicJuego = new Audio('../../assets/Multimedia/Audio/Juego/Juego.mp3');
    musicJuego.volume = 0.2; // Configuramos el volumen inicial
    musicJuego.loop = true; // Repetir automáticamente
    musicJuego.autoplay = true; // Habilitamos el autoplay
    musicJuego.play();

    // Hacer la instancia accesible globalmente
    window.music = musicJuego;
});