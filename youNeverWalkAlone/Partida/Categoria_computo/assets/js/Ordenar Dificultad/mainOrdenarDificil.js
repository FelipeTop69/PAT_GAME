document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "/Partida/Ordenar_Incorrecto.html";
    iniciarTemporizador(segundos, url)

    // Configuración Ordenamient
    initDragAndDrop({
        arregloObjetivo: ["numeroOcho", "numeroCinco", "numeroUno", "numeroTres", "numeroSiete", "numeroNueve", "numeroCuatro", "numeroSeis"],
        numElementos: 8,
        contenedor: 'caja',
        botonEnviar: 'botonEnviar',
        urls: {
            correcto: '/Partida/Ordenar_Valido.html',
            incorrecto: '/Partida/Ordenar_Incorrecto.html'
        }
    }); 
})