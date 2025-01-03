document.addEventListener('DOMContentLoaded',  function(){
    const botonComienzo = document.getElementById('botonComienzo');

    botonComienzo.addEventListener('click', function(){
        window.location.href="Registro.html"
    });

    music.play();
});

const music = new Audio('../assets/Multimedia/Audio/PrePartida/Comienzo.mp3');
music.volume = 0.6; // Configuramos el volumen
music.loop = true; // Repetir automáticamente
music.autoplay = true; // Habilitamos el autoplay

