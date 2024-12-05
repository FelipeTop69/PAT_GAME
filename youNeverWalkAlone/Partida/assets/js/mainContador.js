document.addEventListener('DOMContentLoaded', () => {

    const audio = new Audio('../assets/Multimedia/Audio/Juego/Contador.mp3')
    audio.muted = true; 
    audio.volume = 0.6; 
    // audio.play();
    setTimeout(() => {
        audio.play().then(() => {
            audio.muted = false; 
        }).catch((error) => {
            console.error('Error al reproducir el audio:', error);
        });
    }, 2000);


    setTimeout(() => {
        window.location.href = 'Dificultades/Dificultad.php';
    }, 6000); 
});
