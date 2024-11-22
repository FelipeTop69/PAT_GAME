document.addEventListener('DOMContentLoaded', function () {
    // BOTON VOLVER
    const iconoVolver =
        `
        <svg class="icono-volver" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 32" fill="none" >
            <path fill="white" stroke="black" stroke-width="2" 
            d="M8.02559 29.3491V30.3491H9.02559H20.9567C23.9733 30.3491 26.587 29.3074 28.7426 27.2371L28.7427 27.2371C30.9056 25.1595 32 22.5915 
            32 19.5931C32 16.5943 30.9055 14.0293 28.7411 11.9591C26.5853 9.89706 23.972 8.86009 20.9567 8.86009H13.7403L15.8355 6.76488L16.5425 
            6.05783L15.8355 5.35072L12.7781 2.29294L12.072 1.58666L11.3648 2.29198L2.29381 11.3394L1.58395 12.0475L2.29381 12.7555L11.3648 21.8029L12.072 
            22.5083L12.7781 21.802L15.8355 18.7442L16.5425 18.0371L15.8355 17.33L13.7403 15.2348H20.9567C22.2549 15.2348 23.3418 15.6611 24.2697 16.5245L24.2698 
            16.5246C25.1848 17.3757 25.6253 18.386 25.6253 19.6162C25.6253 20.8461 25.185 21.8511 24.2725 22.6937L24.2724 22.6938C23.3449 23.5504 22.2571 23.9744 
            20.9567 23.9744H9.02559H8.02559V24.9744V29.3491Z" />
        </svg>
        `
    const botonVolver = document.querySelector('.boton-volver');
    if(botonVolver){
        botonVolver.innerHTML = iconoVolver
    }else{
        console.log('Botón volver no econtrado');
    }
})

// Configuracion de la alerta
// Los estilos de esta alerta estan en style.css linea 199
const alertConfigCerrar = {
    title: '¡ADVERTENCIA!',
    footer: '¡No podras volver a la partida!',
    backdrop: 'rgba(0, 0, 0, 0.8)',
    timer: 6000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,

    customClass: {
        container: 'container-alerta',
        popup: 'popup-alerta',
        header: 'header-alerta',
        title: 'title-alerta',
        icon: 'default-icono',
        closeButton: 'closeButton-alerta',
        htmlContainer: 'htmlContainer-alerta',
        actions: 'actions-alerta',
        confirmButton: 'boton-alerta-confirmar',
        cancelButton: 'boton-alerta-cancelar',
        loader: 'loader-alerta',
        footer: 'footer-alerta',
        timerProgressBar: 'timerProgressBar-alerta',
    },

    // Animaciones para la clase
    showClass: {
        popup: `
			animate__animated
			animate__fadeInUpBig
			animate__faster
			`
    },
    hideClass: {
        popup: `
			animate__animated
			animate__fadeOutDownBig
			`
    },

    showConfirmButton: true,
    confirmButtonText: '<span>Si, salir</span> <svg class xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path class="icono-confirmar" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 12v.01M3 21h18M5 21V5a2 2 0 0 1 2-2h7.5M17 13.5V21M14 7h7m-3-3l3 3l-3 3"/></svg>',
    showCancelButton: true,
    cancelButtonText: '<span>No</span> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><path class="icono-cancelar" fill="#ffffff" d="m12.12 10l3.53 3.53l-2.12 2.12L10 12.12l-3.54 3.54l-2.12-2.12L7.88 10L4.34 6.46l2.12-2.12L10 7.88l3.54-3.53l2.12 2.12z"/></svg>',
};