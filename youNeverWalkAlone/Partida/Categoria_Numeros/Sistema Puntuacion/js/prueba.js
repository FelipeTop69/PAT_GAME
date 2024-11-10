// Función para listar los jugadores (usando AJAX para obtener los datos)
const botonListar = document.querySelector('button')

botonListar.addEventListener('click', () =>{

    let url = "Sistema Puntuacion/php/ejecutarConsultas.php";
    const formData = new FormData();
    formData.append('tipo_operacion', 'listar');

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {

        for (let item of data) {
            console.log(item.puntos_obtenidos);
        }

    })
    .catch(function(error) {
        console.log('Error: ', error);
    });


})



