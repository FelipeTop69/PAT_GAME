document.addEventListener('DOMContentLoaded', () => {
    const cortina = document.querySelector('.cortina');
    const text = document.querySelector('.title-incognita')
    const eyes = document.querySelector('.contenedor-eyes')

    setTimeout(() => {
        const audio = new Audio('../assets/multimedia/audio/Podio/Suspenso.mp3')
        audio.muted = true; 
        audio.volume = 0; 
        audio.currentTime = 1;
        // audio.play();

        audio.play().then(() => {
            audio.muted = false; 
            let volume = 0; 
            const maxVolume = 1; 
            const fadeDuration = 8000; // Duración en ms
            const interval = 200; // Intervalo entre pasos
            const steps = fadeDuration / interval; 
            const step = 1 / steps; 

            // Incrementar gradualmente el volumen
            const fadeIn = setInterval(() => {
                if (volume < maxVolume) {
                    volume = Math.min(volume + step, maxVolume);
                    audio.volume = volume;
                } else {
                    clearInterval(fadeIn);
                }
            }, interval);
        }).catch((error) => {
            console.error('Error al reproducir el audio:', error);
        });

        setTimeout(() => {
            cortina.classList.add('animate__fadeOut');  
            cortina.style.setProperty('--animate-duration', '4s')       
            cortina.addEventListener('animationend', function () {
                cortina.remove();
            });     
            setTimeout(() => {
                // Animar
                text.classList.remove('opacidad')
                text.classList.add('animate__fadeInDown', 'animate__faster')
                setTimeout(() => {
                    eyes.classList.remove('opacidad')
                    eyes.classList.add('animate__fadeIn', 'animate__slower')
                    setTimeout(() => {
                        window.location.href = 'Podio.html'
                    }, 5800);
                }, 400);
            }, 1500);
        }, 2000);
    }, 200);
})

const contenedorEyes = document.querySelector('.contenedor-eyes');

// Primer Ojo
const eye1 = document.createElement('div');
eye1.classList.add('eye');

// Elementos dentro de Ojo
const upperPupil1 = document.createElement('div');
upperPupil1.classList.add('upper-pupil');
const iris1 = document.createElement('div');
iris1.classList.add('iris');
const pupil1 = document.createElement('div');
pupil1.classList.add('pupil');
const lowerPupil1 = document.createElement('div');
lowerPupil1.classList.add('lower-pupil');

// Agregar Elelentos primer Ojo
iris1.appendChild(pupil1);
eye1.appendChild(upperPupil1);
eye1.appendChild(iris1);
eye1.appendChild(lowerPupil1);

// Segundo Ojo
const eye2 = document.createElement('div');
eye2.classList.add('eye');

// Elementos dentro de Ojo
const upperPupil2 = document.createElement('div');
upperPupil2.classList.add('upper-pupil');
const iris2 = document.createElement('div');
iris2.classList.add('iris');
const pupil2 = document.createElement('div');
pupil2.classList.add('pupil');
const lowerPupil2 = document.createElement('div');
lowerPupil2.classList.add('lower-pupil');

// Agregar Elelentos segundo Ojo
iris2.appendChild(pupil2);
eye2.appendChild(upperPupil2);
eye2.appendChild(iris2);
eye2.appendChild(lowerPupil2);

// Agregar Ojos al contenedor
contenedorEyes.appendChild(eye1);
contenedorEyes.appendChild(eye2);





