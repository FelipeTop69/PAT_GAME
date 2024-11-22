document.addEventListener('DOMContentLoaded', function () {
    // Boton Informacion
    // Inyectar Icono
    const iconoPregunta =
        `
        <svg class="icono-pregunta" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" fill="none">
            <path d="M56.774 60.8766C70.0108 58.2797 80.1667 47.7771 80.1667 35C80.1667 20.2174 66.605 8.5 
            50.3333 8.5C34.0617 8.5 20.5 20.2174 20.5 35C20.5 36.7239 21.1848 38.3772 22.4038 39.5962C23.6228 
            40.8152 25.2761 41.5 27 41.5C28.7239 41.5 30.3772 40.8152 31.5962 39.5962C32.8152 38.3772 33.5 
            36.7239 33.5 35C33.5 27.825 40.7579 21.5 50.3333 21.5C59.9087 21.5 67.1667 27.825 67.1667 
            35C67.1667 42.175 59.9087 48.5 50.3333 48.5C48.6094 48.5 46.9561 49.1848 45.7371 50.4038C44.5182 
            51.6228 43.8333 53.2761 43.8333 55V60C43.8333 61.7239 44.5182 63.3772 45.7371 64.5962C46.9561 
            65.8152 48.6094 66.5 50.3333 66.5C52.0572 66.5 53.7105 65.8152 54.9295 64.5962C55.94 63.5857 
            56.5834 62.2768 56.774 60.8766ZM50.3333 71.8333C48.3885 71.8333 46.4873 72.41 44.8702 
            73.4906C43.2531 74.5711 41.9928 76.1068 41.2485 77.9036C40.5043 79.7004 40.3095 81.6776 40.6889 
            83.5851C41.0684 85.4925 42.0049 87.2447 43.3801 88.6199C44.7553 89.9951 46.5075 90.9316 48.4149 
            91.3111C50.3224 91.6905 52.2996 91.4957 54.0964 90.7515C55.8932 90.0072 57.4289 88.7469 58.5094 
            87.1298C59.59 85.5127 60.1667 83.6115 60.1667 81.6667C60.1667 79.0587 59.1307 76.5576 57.2865 
            74.7134C55.4424 72.8693 52.9413 71.8333 50.3333 71.8333Z" fill="white" stroke="black" stroke-width="5"/>
        </svg>
        `

    const contenidoBotonModal =
        `
        <h6>ENTENDIDO</h6>
        <svg class="icono-entendido" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g >
            <path d="M11.502 3.11a1.05 1.05 0 0 0-1.267-.167l-4.36 2.518l.002-.013l-2.36 1.26A2.87 2.87 0 0 0 2 9.235v.072l.001.077a2.796 
            2.796 0 0 0 2.795 2.718h2.907c1.21 0 2.395-.347 3.414-1l2.416-1.343a1.062 1.062 0 0 0-.912-1.9l3.901-2.252a1.045 
            1.045 0 0 0 .384-1.432l-.046-.072c-.161.327-.444.654-.906.939c-.61.376-2.211 1.286-3.847 2.211l-.37-.365c.756-.427 1.508-.854 
            2.163-1.228l.243-.138a67 67 0 0 0 1.549-.906c.56-.345.77-.735.833-1.074a1.05 1.05 0 0 0-1.383-1.09h.002a1.56 1.56 0 0 1-.663 
            1.953L11.163 6.32l-.38-.375l3.44-1.986a1.048 1.048 0 1 0-1.047-1.815l-1.218.703q.086.102.155.222a1.563 1.563 0 0 1-.572 2.134L9.558 
            6.35v.305l.007-.004c-.017.669-.19 1.922-.794 2.852a.5.5 0 0 0-.09.197a7 7 0 0 1-.693.956l-.02.016c-.35.288-.72-.117-.585-.43A7.5 7.5 
            0 0 0 8.48 8.589h-.003a6 6 0 0 0 .485-1.857l.003-.04a6 6 0 0 0 .024-.528v-.08l2.295-1.324a1.048 1.048 0 0 0 .218-1.648"/>
            <path d="M7.297 18c0-1.788.31-3.452.912-4.914a7 7 0 0 1-.506.017H6.067c-.516 1.525-.77 3.181-.77 4.897c0 3.51 1.06 6.77 3.264 
            9.163C10.778 29.57 14.06 31 18.297 31s7.52-1.43 9.736-3.837c2.204-2.394 3.264-5.654 3.264-9.163s-1.06-6.77-3.264-9.163C25.817 6.43 22.535 5 18.297 5q-.137 0-.273.002a2.05 2.05 0 0 1-1.002 1.472l-1.28.74q1.186-.212 2.555-.214c3.765 0 6.482 1.256 8.265 3.192c1.796 1.95 2.735 4.69 2.735 7.808s-.94 5.858-2.735 7.808C24.78 27.744 22.062 29 18.297 29c-3.764 0-6.482-1.256-8.265-3.192c-1.795-1.95-2.735-4.69-2.735-7.808"/><path d="M14.012 17.144a2.572 2.572 0 1 0 0-5.143a2.572 2.572 0 0 0 0 5.143m8.572 0a2.572 2.572 0 1 0 0-5.143a2.572 2.572 0 0 0 0 5.143M14.9 20.178a.75.75 0 0 0-1.213.883c.548.751 2.147 2.152 4.45 2.152c2.282 0 4.093-1.38 4.741-2.087a.75.75 0 0 0-1.106-1.013c-.478.522-1.917 1.6-3.635 1.6c-1.697 0-2.889-1.057-3.237-1.535"/></g>
        </svg>
        `
    document.querySelector('.boton-informacion').innerHTML = iconoPregunta;
    document.querySelector('.fondo-boton-modal').innerHTML = contenidoBotonModal;

    // listarJugadores()
})

// Inyectar contenido del modal
const contenidoModal = 
    `
    <div class="modal-dialog modal-dialog-centered">
        <div  class="modal-content contenedor-modal">
            <div class="encabezado-modal modal-header ">
                <h3 class="modal-title titulo-modal" id="modalInformacionLabel">¿COMO  JUGAR?</h3>
            </div>
            <div class="modal-body">
                <video id="contenedorVideo" class="contenedor-video" width="100%" height="auto" controls >
                    <source src="../assets/multimedia/videos/Tutorial PAT GAME.mp4" type="video/mp4">
                    Tu navegador no soporta el elemento de video.
                </video>
            </div>
            <div class="final-modal modal-footer">
                <button type="button" class="boton-modal" data-bs-dismiss="modal">
                    <div class="fondo-boton-modal">
                    </div>
                </button>
            </div>
        </div>
    </div>
    `

document.querySelector('#modalInformacion').innerHTML = contenidoModal;

// Reproduccion del video modal
const modal = document.getElementById('modalInformacion');
const video = document.getElementById('contenedorVideo');

// Detectar cuando se abre el modal
modal.addEventListener('shown.bs.modal', function () {
    // video.play(); 
});

// Detectar cuando se cierra el modal
modal.addEventListener('hidden.bs.modal', function () {
    video.pause();
    video.currentTime = 0;
});



// //Listar jugadores en la tabla
// function listarJugadores() {
//     let contenedor = document.getElementById('cartaJugadores'); 
//     let jugadoresRegistrados = "";

//     jugadores.forEach((jugador) => {
//         jugadoresRegistrados += 
//         `
//             <div class="jugador">
//                 <div class="avatar-jugador p-1">
//                     <img class="img-fluid" src="${jugador.avatar}" alt="avatar" alt="avatar">
//                 </div>
//                 <div class="nombre-jugador">
//                     ${jugador.nombre}
//                 </div>
//             </div>
//         `;
//     });

//     contenedor.innerHTML = jugadoresRegistrados; 
// }



// Inyectar Jugadores en el DOOM
// function inyectarJugadores(pCantidad) {
//     let cantidad = pCantidad;
//     let iteracion;
//     let pantalla = "";
//     let contenedor = document.getElementById('cartaJugadores')

//     for (iteracion = 0; iteracion < cantidad; iteracion++) {
//         pantalla +=
//             `
//             <div class="jugador">
//                 <div class="avatar-jugador p-1">
//                     <img class="img-fluid" src="assets/img/Recursos/Avatar Limpio.png" alt="avatar">
//                 </div>
//                 <div class="nombre-jugador">
//                     Jugador ${iteracion + 1}
//                 </div>
//             </div>
//             `
//     }

//     contenedor.innerHTML = pantalla;

// }

// inyectarJugadores(25)




