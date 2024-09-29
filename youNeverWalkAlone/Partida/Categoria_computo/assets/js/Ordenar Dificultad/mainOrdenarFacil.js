document.addEventListener('DOMContentLoaded', function () {
    // Configuracion Temporizador
    const segundos = 30;
    const url = "/Partida/Ordenar_Incorrecto.html";
    // iniciarTemporizador(segundos, url)

    // Configuración Ordenamient
    initDragAndDrop({
        arregloObjetivo: ["numeroCinco", "numeroSiete", "numeroDos", "numeroCuatro"],
        numElementos: 4,
        contenedor: 'caja',
        botonEnviar: 'botonEnviar',
        urls: {
            correcto: '/Partida/Ordenar_Valido.html',
            incorrecto: '/Partida/Ordenar_Incorrecto.html'
        }
    }); 
})
