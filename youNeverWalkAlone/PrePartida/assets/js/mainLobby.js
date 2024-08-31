// Inyectar Jugadores en el DOOM
function inyectarJugadores(pCantidad){
    let cantidad = pCantidad;
    let iteracion;
    let pantalla = "";
    let contenedor = document.getElementById('cartaJugadores')

    for(iteracion = 0; iteracion < cantidad; iteracion++){
        pantalla += 
        `<div class="border jugador">
            <div class="avatar-jugador"></div>
            <div class="nombre-jugador"></div>
        </div>`
    }

    contenedor.innerHTML = pantalla;
    
}

// inyectarJugadores()