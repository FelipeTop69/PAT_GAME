document.addEventListener('DOMContentLoaded', function () {
    iniciarBarraProgreso('#barraProgresoFacil', 8000, 'Ordenar.html');  
    const contenedorMemorizar = document.getElementById('contenedorMemorizarFacil')
    const imagenes = [
        'assets/img/Recursos/Elementos Memorizar/Altavoces.png',
        'assets/img/Recursos/Elementos Memorizar/USB.png',
        'assets/img/Recursos/Elementos Memorizar/Router.png',
        'assets/img/Recursos/Elementos Memorizar/Monitor.png',
    ]
    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})