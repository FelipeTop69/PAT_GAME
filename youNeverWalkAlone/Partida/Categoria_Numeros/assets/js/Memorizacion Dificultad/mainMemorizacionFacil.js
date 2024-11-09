document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función que actualiza el HTML
    actualizarRondaHTML();
    
    iniciarBarraProgreso('#barraProgresoFacil', 8000, 'Ordenar.html'); 
    const contenedorMemorizar = document.getElementById('contenedorMemorizarFacil');
    // genera elementos aleatoriamente
    const numeros = obtenerElementosAleatorios('facil', 4);
    const claseAdicional = ['el-facil'];
    // guardar los elementos generados en el localStorage
    localStorage.setItem('numerosMemorizados', JSON.stringify(numeros));
    // inyectar los elementos en el contenedor
    inyectarElementosMemorizar(numeros, contenedorMemorizar, claseAdicional);
})