document.addEventListener('DOMContentLoaded', function () {
    // iniciarBarraProgreso('#barraProgresoDificil', 12000, 'Ordenar Dificil.html');
    const contenedorMemorizar = document.getElementById('contenedorMemorizarDificil')
    const imagenes = [
        'assets/img/Recursos/Elementos Memorizar/Piña.png',
        'assets/img/Recursos/Elementos Memorizar/Pera.png',
        'assets/img/Recursos/Elementos Memorizar/Kiwi.png',
        'assets/img/Recursos/Elementos Memorizar/Guayaba.png',
        'assets/img/Recursos/Elementos Memorizar/Granadilla.png',
        'assets/img/Recursos/Elementos Memorizar/Uva.png',
        'assets/img/Recursos/Elementos Memorizar/Frambuesa.png',
        'assets/img/Recursos/Elementos Memorizar/Fresa.png',
    ]
    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})