const formRegistro = document.getElementById('formularioRegistro');
const url = 'Registro/php/ejecutarConsultas.php'

formRegistro.addEventListener('submit', (focus) =>{

    focus.preventDefault();

    const datosFormulario = new FormData(formRegistro);
    // console.log(datosFormulario)

    fetch(url,{
        method: 'POST',
        body: datosFormulario
    })
    .then(data => data.json())
    .then(data =>{
        if(data.error){
            Swal.fire({
                title: 'Opss..',
                text: data.error,
                icon: 'error',
                footer: 'Verifica tu Número de Documento',
                customClass: {
                    popup: 'animate__animated animate__bounceInDown' // Animación de entrada
                },
                showConfirmButton: true,
                confirmButtonText: 'CERRAR',
                willClose: () => {
                    // Añadir la animación de salida justo antes de que la alerta se cierre
                    document.querySelector('.swal2-popup').classList.add('animate__animated', 'animate__bounceOutDown');
                }
            });
        }else{
            console.log(data)
            window.location.href='Lobby.php'
            formRegistro.reset();
        }
        
        
    })
    .catch(function(error){
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
