document.addEventListener('DOMContentLoaded', function () {
    iniciarBarraProgreso('#barraProgresoMedio', 8000, 'Ordenar Medio.html'); 
    const contenedorMemorizar = document.getElementById('contenedorMemorizarMedio')
    const numeros = [1, 9, 4, 8, 0, 2];
    const claseAdicional = ['el-medio'];
    inyectarElementosMemorizar(numeros, contenedorMemorizar, claseAdicional);
})