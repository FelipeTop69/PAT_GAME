const formRegistro = document.getElementById('formularioRegistro');
const url = 'Registro/php/ejecutarConsultas.php'
const urlBandera = '../Bandera/ejecutarConsultas.php'

// Configuracion de la alerta
// Los estilos de esta alerta estan en style.css linea 199
const alertConfigRegistro = {
    title: 'Opss...',
    icon: 'info',
    footer: 'Verifica tu Número de Documento',
    backdrop: 'rgba(0, 0, 0, 0.8)',
    // timer: 2000,
    // timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: true,

    customClass: {
        htmlContainer: 'texto-alerta-validacion', 
    },

    // Animaciones para la clase
    showClass: {
        popup: `
			animate__animated 
            animate__bounceInDown
			`
    },
    hideClass: {
        popup: `
			animate__animated
            animate__bounceOutDown
			`
    },

    showConfirmButton: true,
    confirmButtonText: '<span>CERRAR</span>',
};

formRegistro.addEventListener('submit', (focus) => {

    focus.preventDefault();

    const datosFormulario = new FormData(formRegistro);
    // console.log(datosFormulario)

    fetch(url, {
        method: 'POST',
        body: datosFormulario
    })
        .then(data => data.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    ...alertConfigRegistro,
                    html: data.error,
                });
            }else if(data.limite){
                Swal.fire({
                    icon: "info",
                    title: "Registro no permitido",
                    text: data.limite
                });
            }else {
                console.log(data);
            
                // Reproducir el sonido
                const music = new Audio('../assets/Multimedia/Audio/PrePartida/Registro.mp3');
                music.play();
            
                // Esperar 1 segundo antes de redirigir
                setTimeout(() => {
                    window.location.href = 'Lobby.html';
                }, 2000);

                // Reiniciar el formulario
                formRegistro.reset();
            }


        })
        .catch(function (error) {
            console.log('Error Papi:', error)
        })

})

function soloNumeros(event) {
    const campoNoDocumento = event.target;
    const valor = campoNoDocumento.value;
    const regex = /^[0-9]*$/;
    if (!regex.test(valor)) {
        campoNoDocumento.value = valor.replace(/[^0-9]/g, '');
    }
}

const verificarPartida = () => {

    fetch(urlBandera, {
        method: 'POST',
        body: new URLSearchParams({
            'tipo_operacion': 'verificar_existencia_partida'
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data === false) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Opss..',
                    text: 'No se encontro ninguna paritda, solicita al ADMIN',
                    customClass: {
                        popup: 'animate__animated animate__bounceInDown' // Animación de entrada
                    },
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'Comienzo.html'
                    }
                })

            }
        })
        .catch(function (error) {
            console.log('Error papi:', error)
        })

}

document.addEventListener('DOMContentLoaded', () => {
    verificarPartida()
    setInterval(verificarPartida, 4000)
})
