const url = "Procesos Admin/php/ejecutarConsultas.php";
const imagenCategoria = {
    1: 'assets/img/Categorias/Numeros.png',
    2: 'assets/img/Categorias/Frutas.png',
    3: 'assets/img/Categorias/Computo.png',
}
const formularioConfig = document.querySelector('#formularioConfiguracion');


const obtenerCategorias = () => {

    fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ 'tipo_operacion': 'obtener_categorias' })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            pintarCategorias(data);
        })
        .catch(error => {
            console.error('Error al configurar partida:', error);
        });

}

const pintarCategorias = (data) => {
    const contenedorCategorias = document.querySelector('#contenedorCategorias');
    contenedorCategorias.innerHTML = "";

    data.forEach(categoria => {
        contenedorCategorias.innerHTML += `
            <div class="col-xl-3 col-md-6">
                <div class="card" style="width: 18rem;">
                    <img src="${imagenCategoria[categoria.idcategoria]}" class="card-img-top" alt="Categoría">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center gap-2">
                        <h5 class="card-title text-center">${categoria.nombre}</h5>
                        <label class="switch text-center">
                            <input type="checkbox" class="switch-checkbox" name="categoria" value="${categoria.idcategoria}">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    });

    // Ver Valor Switch
    const switches = document.querySelectorAll('.switch-checkbox');
    switches.forEach(switchElement => {
        switchElement.addEventListener('change', (event) => {
            console.log(`Valor: ${event.target.value}, Estado: ${event.target.checked}`);
        });
    });

    switches.forEach(switchElement => {
        switchElement.addEventListener('change', (event) => {
            if (event.target.checked) {
                // Desactivar todos los switches excepto el actual
                switches.forEach(s => {
                    if (s !== event.target) {
                        s.checked = false;
                    }
                });
            }
        });
    });
};

formularioConfig.addEventListener('submit', (event) => {
    event.preventDefault();

    const datosFormulario = new FormData(formularioConfig);
    const inputsTiempos = formularioConfig.querySelectorAll('input[type="number"]');
    const categoriaSelecionada = datosFormulario.get('categoria');
    let valido = true;


    // Verificar existencia de partida
    fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ 'tipo_operacion': 'existencia_partida' })
    })
    .then(response => response.json())
    .then(data => {
        if (data > 0) {
            Swal.fire({
                title: "Atención",
                icon: "warning",
                text: "Ya existe una partida en curso.",
                footer: "Espera a que termine o finaliza la partida actual.",
            });
        } else {
            // Validar campos
            if (!categoriaSelecionada) {
                Swal.fire({
                    title: "Ops...",
                    text: "Por favor, selecciona una categoría.",
                    icon: "warning",
                });
                return; // Salir si no hay categoría seleccionada
            }

            inputsTiempos.forEach(input => {
                const valor = parseFloat(input.value);

                if (!valor || valor < 2 || valor > 30) {
                    valido = false;
                    input.style.borderColor = 'red'; 
                } else {
                    input.style.borderColor = 'green'; 
                }
            });

            if (!valido) {
                Swal.fire({
                    title: "Ops...",
                    text: "Completa todos los campos con valores válidos.",
                    footer: "Los tiempos deben estar entre 2 y 30 segundos.",
                    icon: "warning",
                });
                return; // Salir si hay campos malos
            }

            // Configurar nueva partida
            datosFormulario.append('tipo_operacion', 'configuracion_partida');
            fetch(url, {
                method: 'POST',
                body: datosFormulario
            })
            .then(response => response.json())
            .then(data => {
                console.log("Partida configurada con éxito:", data);
                formularioConfig.reset();
                window.location.href = "Union_Jugadores.html";
            })
            .catch(error => {
                console.error('Error al configurar partida:', error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo configurar la partida. Inténtalo de nuevo.",
                    icon: "error",
                });
            });
        }
    })
    .catch(error => {
        console.error('Error al verificar partida:', error);
        Swal.fire({
            title: "Error",
            text: "No se pudo verificar la existencia de partidas. Inténtalo de nuevo.",
            icon: "error",
        });
    });
});


addEventListener('DOMContentLoaded', () =>{
    obtenerCategorias();
})