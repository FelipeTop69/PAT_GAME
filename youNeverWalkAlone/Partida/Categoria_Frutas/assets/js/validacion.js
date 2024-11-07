function compararArreglos(pOrdenValido, pOrdenJugador) {
    const ordenValido = pOrdenValido;
    const ordenJugador = pOrdenJugador;
    let puntos = 0; // Variable para contar los puntos
    // let resultados = [];

    // Recorrer y comparar cada posición entre los dos arreglos
    for (let iteracion = 0; iteracion < ordenValido.length; iteracion++) {
        const elementoDrop = document.querySelector(`#${ordenJugador[iteracion]}`); // Buscar el elemento por su ID

        if (ordenValido[iteracion] === ordenJugador[iteracion]) {
            puntos = puntos + 100;  // Sumar puntos si la posición coincide
            // resultados.push(`Posición ${iteracion + 1}: Coincide`);

            // Aplicar clase de coincidencia
            elementoDrop.classList.add('coincide');
            elementoDrop.classList.remove('no-coincide');
        } else {
            // resultados.push(`Posición ${iteracion + 1}: No coincide`);
            elementoDrop.classList.add('no-coincide');
            elementoDrop.classList.remove('coincide');
        }
    }

    // Mostrar los resultados en la consola
    // resultados.forEach(resultado => console.log(resultado));
    
    
    return puntos;
}

function validarOrden() {
    // Recuperar el estado de ordenJugador desde localStorage (si es necesario)
    let ordenJugador = JSON.parse(localStorage.getItem('ordenJugador')) || [];
    
    const puntos = compararArreglos(idElementos, ordenJugador);
    const cantidadPuntosRequeridos = ordenJugador.length * 100;

    // Asignar puntos extra según el intervalo actual
    let puntosExtra = 0;
    if (intervaloActual === 'facil') {
        puntosExtra = 50;  // Puntos extra por hacer clic en el primer intervalo
    } else if (intervaloActual === 'medio') {
        puntosExtra = 30;  // Puntos extra por hacer clic en el segundo intervalo
    } else if (intervaloActual === 'dificil') {
        puntosExtra = 10;  // Puntos extra por hacer clic en el tercer intervalo
    }

    // Sumar los puntos extra a los puntos normales
    const puntosTotales = puntos + puntosExtra;

    console.log(`Cantidad de puntos requeridos: ${cantidadPuntosRequeridos}`);
    console.log(`Puntos obtenidos: ${puntos}`);
    console.log(`Orden del jugador: ${ordenJugador}`);

    localStorage.setItem('puntos', puntosTotales); 
    localStorage.setItem('puntosRequeridos', cantidadPuntosRequeridos);

    window.location.href = "../Ordenar_Validacion.html";
}

// ANTES DE ASGINAR PUNTOS 0 SI SE TERMINA EL TIEMPO
// function validarOrden() {
//     const ordenJugador = Array.from(contenedorDrop.querySelectorAll('.elemento-ordenar')).map(elemento => elemento.getAttribute('data-id'));
//     const puntos = compararArreglos(idElementos, ordenJugador);
//     const cantidadPuntosRequeridos = ordenJugador.length * 100;

//     console.log(`Cantidad de puntos requeridos: ${cantidadPuntosRequeridos}`);
//     console.log(`Puntos obtenidos: ${puntos}`);
//     console.log(`Orden del jugador: ${ordenJugador}`);

//     localStorage.setItem('puntos', puntos); 
//     localStorage.setItem('puntosRequeridos', cantidadPuntosRequeridos);

//     window.location.href = "../Ordenar_Validacion.html"
// }










