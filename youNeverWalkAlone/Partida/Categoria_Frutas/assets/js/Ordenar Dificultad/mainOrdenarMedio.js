document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../Ordenar_Incorrecto.html";
    iniciarTemporizador(segundos, url)

    // Configuración Ordenamient
    initDragAndDrop({
        arregloObjetivo: ["numeroTres", "numeroUno", "numeroDos", "numeroNueve", "numeroOcho", "numeroCinco"],
        numElementos: 6,
        contenedor: 'caja',
        botonEnviar: 'botonEnviar',
        urls: {
            correcto: '../Ordenar_Valido.html',
            incorrecto: '../Ordenar_Incorrecto.html'
        }
    }); 
})