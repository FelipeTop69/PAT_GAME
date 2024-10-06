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

    console.log(`Cantidad de puntos requeridos: ${cantidadPuntosRequeridos}`);
    console.log(`Puntos obtenidos: ${puntos}`);
    console.log(`Orden del jugador: ${ordenJugador}`);

    localStorage.setItem('puntos', puntos); 
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










