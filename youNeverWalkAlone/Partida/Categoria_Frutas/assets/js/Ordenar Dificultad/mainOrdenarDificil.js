document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "../Ordenar_Incorrecto.html";
    iniciarTemporizador(segundos, url)

    // Configuración Ordenamient
    initDragAndDrop({
        arregloObjetivo: ["numeroDos", "numeroOcho", "numeroCinco", "numeroCuatro", "numeroTres", "numeroNueve", "numeroSiete", "numeroUno"],
        numElementos: 8,
        contenedor: 'caja',
        botonEnviar: 'botonEnviar',
        urls: {
            correcto: '../Ordenar_Valido.html',
            incorrecto: '../Ordenar_Incorrecto.html'
        }
    }); 
})