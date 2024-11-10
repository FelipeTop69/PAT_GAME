document.addEventListener('DOMContentLoaded', function () {
    iniciarBarraProgreso('#barraProgresoFacil', 8000, 'Ordenar.html');  
    const contenedorMemorizar = document.getElementById('contenedorMemorizarFacil')
    const imagenes = [
        'assets/img/Recursos/Elementos Memorizar/Coco.png',
        'assets/img/Recursos/Elementos Memorizar/Banana.png',
        'assets/img/Recursos/Elementos Memorizar/Cereza.png',
        'assets/img/Recursos/Elementos Memorizar/Mango.png'
    ]
    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})