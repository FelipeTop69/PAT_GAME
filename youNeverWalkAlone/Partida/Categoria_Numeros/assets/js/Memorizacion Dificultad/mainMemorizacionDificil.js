document.addEventListener('DOMContentLoaded', function () {
    iniciarBarraProgreso('#barraProgresoDificil', 12000, 'Ordenar Dificil.html');
    const contenedorMemorizar = document.getElementById('contenedorMemorizarDificil')
    const numeros = [5, 6, 0, 8, 2, 4, 9, 1];
    const claseAdicional = ['el-dificil'];
    inyectarElementosMemorizar(numeros, contenedorMemorizar, claseAdicional);
})