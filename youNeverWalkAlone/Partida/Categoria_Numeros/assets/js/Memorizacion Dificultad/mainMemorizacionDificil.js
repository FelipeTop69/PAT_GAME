document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();

    const indicador = 'memorizardificil';  // El valor del indicador

    obtenerTiempos(indicador)
        .then(tiempoAsignado => {
            // Validación: Si tiempoAsignado es 0, null, o undefined, no llamar a iniciarBarraProgreso
            if (tiempoAsignado > 0 && tiempoAsignado != null) {
                // Llamamos a la función solo si el tiempo es válido
                iniciarBarraProgreso('#barraProgresoDificil', tiempoAsignado, 'Ordenar Dificil.html');
            } else {
                console.log("El tiempo asignado es 0 o no está disponible, no se inicia la barra de progreso.");
            }
        })
        .catch(error => {
            console.error("Error al obtener el tiempo:", error);
        });

    // iniciarBarraProgreso('#barraProgresoDificil', 8, 'Ordenar Dificil.html');
    const contenedorMemorizar = document.getElementById('contenedorMemorizarDificil');
    // genera elementos aleatoriamente
    const numeros = obtenerElementosAleatorios('dificil', 8);
    const claseAdicional = ['el-dificil'];
    // guardar los elementos generados en el localStorage
    localStorage.setItem('numerosMemorizados', JSON.stringify(numeros));
    // inyectar los elementos en el contenedor
    inyectarElementosMemorizar(numeros, contenedorMemorizar, claseAdicional);
})