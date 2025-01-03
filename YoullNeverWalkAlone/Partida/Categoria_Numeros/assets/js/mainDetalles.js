document.addEventListener('DOMContentLoaded', function () {
    setTimeout(startFadeOut, timePreRedireccion);
})

const timePreRedireccion = 5000; 
const redirrecion = '../Contador.html';

function startFadeOut() {
    const overlay = document.getElementById('fadee-overlay');
    overlay.style.opacity = 1;

    setTimeout(() => {
        window.location.href = redirrecion;
    }, 3000); 
}












