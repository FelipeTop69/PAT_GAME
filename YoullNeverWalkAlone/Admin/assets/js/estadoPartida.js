const btnIniciar = document.getElementById('btnIniciarPartida')
const urlIniciar = '../Bandera/ejecutarConsultas.php';

btnIniciar.addEventListener('click', () => {

    fetch(urlIniciar,{
        method: 'POST',
        body: new URLSearchParams({
            'tipo_operacion' : 'actualizar_estado_partida'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.correcto){
            window.location.href = 'Seguimiento_Partida.html'
        }else{
            Swal.fire({ 
                icon: 'warning', 
                title: `${data.mensaje}`, 
                text: '¿Deseas Configurar una Nueva?', 
                showCancelButton: true, 
                confirmButtonText: 'Sí, vamos', 
                cancelButtonText: 'No' 
            })
            .then((result) => { 
                if (result.isConfirmed) { 
                    window.location.href = 'Configuracion_Partida.html'
                }else if (result.dismiss === Swal.DismissReason.cancel) { 
                    console.log('Bueno, señor')
                }
            })
        }
    })
    .catch(function(error){
        console.log('Error papi:', error)
    })

})