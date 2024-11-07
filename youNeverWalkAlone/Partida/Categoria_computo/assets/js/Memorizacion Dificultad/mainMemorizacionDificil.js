document.addEventListener('DOMContentLoaded', function () {
    iniciarBarraProgreso('#barraProgresoDificil', 12000, 'Ordenar Dificil.html');
    const contenedorMemorizar = document.getElementById('contenedorMemorizarDificil')
    const imagenes = [
        'assets/img/Recursos/Elementos Memorizar/Proyector.png',
        'assets/img/Recursos/Elementos Memorizar/Microfono.png',
        'assets/img/Recursos/Elementos Memorizar/Disco Duro.png',
        'assets/img/Recursos/Elementos Memorizar/USB.png',
        'assets/img/Recursos/Elementos Memorizar/Diademas.png',
        'assets/img/Recursos/Elementos Memorizar/CPU.png',
        'assets/img/Recursos/Elementos Memorizar/Router.png',
        'assets/img/Recursos/Elementos Memorizar/Monitor.png',
    ]
    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})