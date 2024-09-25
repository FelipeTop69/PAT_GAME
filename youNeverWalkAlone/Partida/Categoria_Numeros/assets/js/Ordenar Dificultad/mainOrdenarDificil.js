document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 20;
    const url = "/Partida/Ordenar_Incorrecto.html";
    // iniciarTemporizador(segundos, url)

    // Configuración Ordenamient
    initDragAndDrop({
        arregloObjetivo: ["numeroCinco", "numeroNueve", "numeroSeis", "numeroTres", "numeroUno", "numeroDos", "numeroSiete", "numeroCuatro"],
        numElementos: 8,
        contenedor: 'caja',
        botonEnviar: 'botonEnviar',
        urls: {
            correcto: '/Partida/Ordenar_Valido.html',
            incorrecto: '/Partida/Ordenar_Incorrecto.html'
        }
    }); 
})