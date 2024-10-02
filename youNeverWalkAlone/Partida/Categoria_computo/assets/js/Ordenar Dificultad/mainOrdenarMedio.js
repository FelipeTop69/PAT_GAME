document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "/Partida/Ordenar_Incorrecto.html";
    iniciarTemporizador(segundos, url)

    // Configuración Ordenamient
    initDragAndDrop({
        arregloObjetivo: ["numeroUno", "numeroDos", "numeroCinco", "numeroSeis", "numeroSiete", "numeroNueve"],
        numElementos: 6,
        contenedor: 'caja',
        botonEnviar: 'botonEnviar',
        urls: {
            correcto: '/Partida/Ordenar_Valido.html',
            incorrecto: '/Partida/Ordenar_Incorrecto.html'
        }
    }); 
})
