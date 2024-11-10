document.addEventListener('DOMContentLoaded', function () {
    iniciarBarraProgreso('#barraProgresoMedio', 10000, 'Ordenar Medio.html'); 
    const contenedorMemorizar = document.getElementById('contenedorMemorizarMedio')
    const imagenes = [
        'assets/img/Recursos/Elementos Memorizar/Limon.png',
        'assets/img/Recursos/Elementos Memorizar/Manzana.png',
        'assets/img/Recursos/Elementos Memorizar/Mora.png',
        'assets/img/Recursos/Elementos Memorizar/Melon.png',
        'assets/img/Recursos/Elementos Memorizar/Sandia.png',
        'assets/img/Recursos/Elementos Memorizar/Coco.png',
    ]
    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})