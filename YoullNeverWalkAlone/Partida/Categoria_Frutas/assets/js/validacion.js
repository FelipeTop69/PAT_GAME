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

// Función principal para validar el orden y manejar puntos
async function validarOrden() {
    // Obtener el orden del jugador desde localStorage o inicializar como un arreglo vacío
    let ordenJugador = JSON.parse(localStorage.getItem('ordenJugador')) || [];
    const puntos = compararArreglos(idElementos, ordenJugador);
    const cantidadPuntosRequeridos = ordenJugador.length * 100;

    // Calcular puntos extra según el nivel de dificultad
    let puntosExtra = 0;
    if (intervaloActual === 'facil') {
        puntosExtra = 50;
    } else if (intervaloActual === 'medio') {
        puntosExtra = 30;
    } else if (intervaloActual === 'dificil') {
        puntosExtra = 10;
    }

    const puntosTotales = puntos + puntosExtra;

    console.log(puntosTotales);

    // Almacenar puntos en localStorage para el podio
    localStorage.setItem('puntos', puntosTotales);
    localStorage.setItem('puntosRequeridos', cantidadPuntosRequeridos);

    await enviarPuntosActualizar(puntosTotales);

    // Swal.fire({
    //     title: 'Procesando...',
    //     text: 'Validando Respuesta',
    //     icon: 'info',
    //     allowOutsideClick: false,  
    //     allowEscapeKey: false,    
    //     allowEnterKey: false,     
    //     showConfirmButton: false, 
    //     didOpen: () => {
    //         Swal.showLoading(); 
    //     }
    // });

    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay animate__animated animate__fadeIn animate__fast';

    // Mostrar el overlay
    overlay.classList.add('show');

    // Crear el contenedor del loader
    const contenedorLoader = document.createElement('div');
    contenedorLoader.className = 'contenedor-loader animate__animated animate__bounceInUp animate__fast';

    // Crear el elemento loader
    const loader = document.createElement('div');
    loader.className = 'loader-envio';

    // Crear el span dentro del loader
    const span = document.createElement('span');
    loader.appendChild(span);

    // Crear el texto debajo del loader
    const loaderText = document.createElement('div'); 
    loaderText.className = 'glitch'; 
    loaderText.setAttribute('data-text', 'Loading...'); 
    loaderText.textContent = 'Loading...';

    // Agregar el loader y el texto al contenedor
    contenedorLoader.appendChild(loader);
    contenedorLoader.appendChild(loaderText);

    // Agregar el contenedor al overlay
    overlay.appendChild(contenedorLoader);

    // Agregar el overlay al body
    document.body.appendChild(overlay);
}

// Función para enviar los puntos al servidor
function enviarPuntosActualizar(puntos) {
    const url = "../Sistema Puntuacion/php/ejecutarConsultas.php"; // URL de la página donde se guardan los puntos

    // Crear el objeto FormData con solo los puntos
    const formData = new FormData();
    formData.append('tipo_operacion', 'actualizar_puntuacion_jugador');
    formData.append('puntos_obtenidos', puntos);

    // Hacer la solicitud fetch y redirigir después de completarse
    return fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Puntos Recibidos:', data);
    })
    .catch(function(error) {
        console.log('Error Papi:', error);
    });
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










