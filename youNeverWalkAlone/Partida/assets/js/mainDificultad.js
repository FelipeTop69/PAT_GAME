document.addEventListener('DOMContentLoaded', () =>{
    obtenerTiemposDificultad()
})

const url = '../Obtencion Tiempos/php/ejecutarConsultas.php'

// Función para listar los jugadores en la tabla
const obtenerTiemposDificultad = () => {
    fetch(url, {
        method: 'POST',
        body: new URLSearchParams({
            'tipo_operacion': 'obtener_tiempos'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.error
            }).then(() => {
                window.location.href = "../../PrePartida/Registro.html";
            });
        } else {
            if(data.length === 0){
                console.log('No hay tiempos')
            }else{
                console.log(data)
                pintarTiemposDificultad(data)
            }
        }
    })
    .catch(error => {
        console.error('Error al obtener tiempos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pueden obtener los tiempos. Inténtalo de nuevo.'
        });
    });
};


// Función para mostrar los jugadores en la tabla HTML
const pintarTiemposDificultad = (data) => {

    const campoTimeFacil = document.getElementById('tiempoMemoFacil')
    const campoTimeMedio = document.getElementById('tiempoMemoMedio')
    const campoTimeDificil = document.getElementById('tiempoMemoDificil')

    data.forEach(jugador => {
        if(campoTimeFacil){
            campoTimeFacil.innerHTML = `${jugador.memorizarfacil}s`
        }else{
            console.log('Omitido')
        }
        if(campoTimeMedio){
            campoTimeMedio.innerHTML = `${jugador.memorizarmedio}s`
        }else{
            console.log('Omitido')
        }
        if(campoTimeDificil){
            campoTimeDificil.innerHTML = `${jugador.memorizardificil}s`
        }else{
            console.log('Omitido')
        }
    });
};

