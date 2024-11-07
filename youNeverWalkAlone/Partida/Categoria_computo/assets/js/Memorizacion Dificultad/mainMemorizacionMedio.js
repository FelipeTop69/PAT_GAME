document.addEventListener('DOMContentLoaded', function () {
    iniciarBarraProgreso('#barraProgresoMedio', 10000, 'Ordenar Medio.html'); 
    const contenedorMemorizar = document.getElementById('contenedorMemorizarMedio')
    const imagenes = [
        'assets/img/Recursos/Elementos Memorizar/Disco Duro.png',
        'assets/img/Recursos/Elementos Memorizar/Teclado.png',
        'assets/img/Recursos/Elementos Memorizar/Mouse.png',
        'assets/img/Recursos/Elementos Memorizar/Impresora.png',
        'assets/img/Recursos/Elementos Memorizar/Diademas.png',
        'assets/img/Recursos/Elementos Memorizar/CPU.png',
    ]
    inyectarElementosMemorizar(imagenes, contenedorMemorizar)
})