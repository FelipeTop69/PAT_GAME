document.addEventListener('DOMContentLoaded', function () {
    iniciarBarraProgreso('#barraProgresoFacil', 8000, 'Ordenar.html'); 
    const contenedorMemorizar = document.getElementById('contenedorMemorizar')
    const numeros = [4, 5, 8, 9];
    const claseAdicional = ['el-facil'];
    inyectarElementosMemorizar(numeros, contenedorMemorizar, claseAdicional);
})