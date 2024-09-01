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
    document.querySelector('.boton-informacion').innerHTML = iconoPregunta;

    // Inyectar Jugadores en el DOOM
    function inyectarJugadores(pCantidad){
        let cantidad = pCantidad;
        let iteracion;
        let pantalla = "";
        let contenedor = document.getElementById('cartaJugadores')
    
        for(iteracion = 0; iteracion < cantidad; iteracion++){
            pantalla += 
            `<div class="jugador">
                <div class="avatar-jugador p-1">
                    <img class="img-fluid" src="assets/img/Recursos/Avatar Limpio.png" alt="avatar">
                </div>
                <div class="nombre-jugador">
                    Jugador ${iteracion + 1}
                </div>
            </div>`
        }
    
        contenedor.innerHTML = pantalla;
        
    }
    
    inyectarJugadores(25)

})


