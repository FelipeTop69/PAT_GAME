document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    
    iniciarBarraProgreso('#barraProgresoMedio', 8000, 'Ordenar Medio.html'); 
    const contenedorMemorizar = document.getElementById('contenedorMemorizarMedio');
    // genera elementos aleatoriamente
    const numeros = obtenerElementosAleatorios('medio', 6);
    const claseAdicional = ['el-medio'];
    // guardar los elementos generados en el localStorage
    localStorage.setItem('numerosMemorizados', JSON.stringify(numeros));
    // inyectar los elementos en el contenedor
    inyectarElementosMemorizar(numeros, contenedorMemorizar, claseAdicional);
})