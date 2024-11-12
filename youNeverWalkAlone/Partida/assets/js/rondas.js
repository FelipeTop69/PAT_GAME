//RONDAS POR NIVELES

window.onload = () => {
    // Después de mostrar la puntuación, redirige de nuevo a Memorizacion.html
    setTimeout(() => {
        avanzarRonda();
    }, 8000); // Cambia el tiempo según sea necesario
};

function avanzarRonda() {
    let rondaActual = parseInt(localStorage.getItem('rondaActual') || '1');
    let nivelActual = localStorage.getItem('nivelActual') || 'facil';
    let nuevoNivel;

    // Determinar el nuevo nivel basado en el nivel actual
    if (nivelActual === 'facil') {
        nuevoNivel = 'medio';
    } else if (nivelActual === 'medio') {
        nuevoNivel = 'dificil';
    } else if (nivelActual === 'dificil') {
        nuevoNivel = 'completado';
    }

    // Si aún quedan rondas, incrementar rondaActual y recargar la página correspondiente
    if (rondaActual < 1) {
        localStorage.setItem('rondaActual', rondaActual + 1);

        // Redirigir a la página de memorización según el nivel actual
        if (nivelActual === 'facil') {
            window.location.href = 'Categoria_Numeros/Memorizacion.html';
        } else if (nivelActual === 'medio') {
            window.location.href = 'Categoria_Numeros/Memorizacion Medio.html';
        } else if (nivelActual === 'dificil') {
            window.location.href = 'Categoria_Numeros/Memorizacion Dificil.html';
        }
    } else {
        // console.log("ronda actual: ", rondaActual)
        // Si se completaron todas las rondas, avanzar al siguiente nivel
        avanzarNivel();
    }
}



function avanzarNivel() {
    let nivelActual = localStorage.getItem('nivelActual') || 'facil';
    let nuevoNivel;
    if(nivelActual === 'facil'){
        nuevoNivel = 'medio';
    } else if(nivelActual === 'medio'){
        nuevoNivel = 'dificil';
    } else if(nivelActual === 'dificil'){
        nuevoNivel = 'completado';
    }
    
    if (nuevoNivel !== 'completado') {
        localStorage.setItem('nivelActual', nuevoNivel);
        localStorage.setItem('rondaActual', '1');

        if(nuevoNivel === 'medio'){
            window.location.href = 'Dificultades/Dificultad Medio.php';
        }
        else if(nuevoNivel === 'dificil'){
        window.location.href = 'Dificultades/Dificultad Dificil.php';
    }
    }else {
        window.location.href = 'Podio.html';
    }
}


