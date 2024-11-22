document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    const indicador = 'memorizarfacil';  // El valor del indicador

    obtenerTiempos(indicador)
        .then(tiempoAsignado => {
            if (tiempoAsignado > 0 && tiempoAsignado != null) {
                // Llamamos a la función solo si el tiempo es válido
                iniciarBarraProgreso('#barraProgresoFacil', tiempoAsignado, 'Ordenar.html');
            } else {
                console.log("El tiempo asignado es 0 o no está disponible, no se inicia la barra de progreso.");
            }
        })
        .catch(error => {
            console.error("Error al obtener el tiempo:", error);
        });

    
    // iniciarBarraProgreso('#barraProgresoFacil', 8, 'Ordenar.html'); 
    const contenedorMemorizar = document.getElementById('contenedorMemorizarFacil');
    // genera elementos aleatoriamente
    const numeros = obtenerElementosAleatorios(4);
    const claseAdicional = ['el-facil'];
    // guardar los elementos generados en el localStorage
    localStorage.setItem('numerosMemorizados', JSON.stringify(numeros));
    // inyectar los elementos en el contenedor
    inyectarElementosMemorizar(numeros, contenedorMemorizar, claseAdicional);
})