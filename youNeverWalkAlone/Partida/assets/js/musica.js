document.addEventListener('DOMContentLoaded', () => {
    // Configuración de la música de fondo
    const backgroundMusic = new Audio('../Partida/Musica/free-fire.mp3');
    backgroundMusic.loop = true; // Repite la música
    backgroundMusic.volume = 0.5; // Ajusta el volumen inicial
    
    // Intentar reproducir música automáticamente al cargar la página
    backgroundMusic.play().then(() => {
        console.log("Música reproducida automáticamente.");
    }).catch(err => {
        console.warn("Error en la reproducción automática:", err);
    });

    // Reiniciar la música al refrescar
    window.addEventListener('beforeunload', () => {
        backgroundMusic.pause(); // Pausa la música antes de recargar
        backgroundMusic.currentTime = 0; // Reinicia el tiempo de reproducción
    });
});