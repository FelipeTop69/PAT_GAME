document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    
    iniciarBarraProgreso('#barraProgresoDificil', 8000, 'Ordenar Dificil.html');
    const contenedorMemorizar = document.getElementById('contenedorMemorizarDificil');
    // genera elementos aleatoriamente
    const numeros = obtenerElementosAleatorios(8);
    const claseAdicional = ['el-dificil'];
    // guardar los elementos generados en el localStorage
    localStorage.setItem('numerosMemorizados', JSON.stringify(numeros));
    // inyectar los elementos en el contenedor
    inyectarElementosMemorizar(numeros, contenedorMemorizar, claseAdicional);
})