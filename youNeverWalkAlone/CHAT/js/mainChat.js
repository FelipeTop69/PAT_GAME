const socket = new WebSocket("ws://192.168.10.10:8080");
const iconoAlerta = `
    <svg xmlns="http://www.w3.org/2000/svg" class="icono-alerta" viewBox="0 0 24 24">
    <g fill="#eab308" fill-opacity="0" stroke="#eab308" stroke-linecap="round" 
    stroke-linejoin="round" stroke-width="1.5"><path stroke-dasharray="64" stroke-dashoffset="64" 
    d="M12 3l9 17h-18l9 -17Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s"
    values="64;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10v4">
    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="6;0"/>
    <animate attributeName="stroke-width" begin="1.95s" dur="3s" keyTimes="0;0.1;0.2;0.3;1" 
    repeatCount="indefinite" values="2;3;3;2;2"/></path><path stroke-dasharray="1.6" 
    stroke-dashoffset="1.6" d="M12 17v0.01"><animate fill="freeze" 
    attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="2;0"/>
    <animate attributeName="stroke-width" begin="2.25s" dur="3s" keyTimes="0;0.1;0.2;0.3;1" 
    repeatCount="indefinite" values="2;3;3;2;2"/></path><animate fill="freeze" 
    attributeName="fill-opacity" begin="1.1s" dur="0.15s" values="0;0.3"/></g></svg>`;

const iconoCerrarChat = `
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48">
    <defs><mask id="IconifyId19393d5bdd2aaa1b85"><path fill="#555" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" 
    stroke-width="2.5" d="m6 11l5-5l13 13L37 6l5 5l-13 13l13 13l-5 5l-13-13l-13 13l-5-5l13-13z" clip-rule="evenodd"/></mask></defs>
    <path fill="#dc2626" d="M0 0h48v48H0z" mask="url(#IconifyId19393d5bdd2aaa1b85)"/></svg>`

const iconoEnviarChat = `
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 14 14">
    <path fill="#65a30d" fill-rule="evenodd" d="M11.821.098a1.62 1.62 0 0 1 2.077 2.076l-3.574 10.712a1.62 
    1.62 0 0 1-1.168 1.069a1.6 1.6 0 0 1-1.52-.434l-1.918-1.909l-2.014 1.042a.5.5 0 0 
    1-.73-.457l.083-3.184l7.045-5.117a.625.625 0 1 0-.735-1.012L2.203 8.088l-1.73-1.73a1.6 
    1.6 0 0 1-.437-1.447a1.62 1.62 0 0 1 1.069-1.238h.003L11.82.097Z" clip-rule="evenodd"/>
    </svg>
`


const btnCerrarChat = document.querySelector('.icono-cerrar-chat');
btnCerrarChat.innerHTML = iconoCerrarChat;

const btnEnviarChat = document.querySelector('.btn-enviar-chat');
btnEnviarChat.innerHTML = iconoEnviarChat;

const configAlertChat = {
    title: 'Campo Vacío',
    iconHtml: iconoAlerta, 
    html: '<span class="mensaje-alerta">Por favor, escribe un mensaje.</span>',
    confirmButtonText: 'OK', 
    customClass: {
        popup: 'cuerpo-alerta',
        icon: 'icono-alerta',
        title: 'titulo-alerta', 
        confirmButton: 'boton-alerta', 
    }
}

socket.onopen = () => {
    console.log("Conectado al Chat")
}

socket.onclose = (event) => {
    if (event.wasClean) {
        console.log('Cerrado por el lado del cliente') 
    } else {
        console.log('Cerrado por el lado del servidor')
    }
}

socket.onerror = (error) => {
    console.error(error)
}

const contenedorMensajes = document.getElementById('contenedorMensajes');

const obtenerNombreJugador = () => {
    const url = '../CHAT/php/ejecutarConsultas.php';

    return fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ 'tipo_operacion': 'obtener_nombre_jugador' })
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if (data && data.nombre && data.imagenurl) {
                return {
                    nombre: data.nombre, // Retorna el nombre
                    imagenurl: data.imagenurl // Retorna el idJugador
                };
            } else {
                throw new Error('Datos incompletos o inválidos'); // Manejo de error si faltan datos
            }
        })
        .catch(error => {
            console.error('Error al obtener el nombre del jugador:', error);
            return null; // Retornar null en caso de error
        });
};



// MENSAJES ENVIADOS
document.getElementById('btnEnviar').addEventListener('click', async () => {
    const mensajeEnviado = document.getElementById('mensajeEnviar').value.trim();

    // Validar si el mensaje está vacío
    if (!mensajeEnviado) {
        Swal.fire({
            ...configAlertChat,
            text: 'El mensaje no puede estar vacío.',
        });
        return;
    }

    // Limpiar el campo de entrada
    document.getElementById('mensajeEnviar').value = '';

    try {
        // Obtener el nombre y el ID del jugador
        const jugadorData = await obtenerNombreJugador();

        if (!jugadorData) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo obtener los datos del jugador. Intenta nuevamente.',
            });
            return;
        }

        const { nombre, imagenurl } = jugadorData; // Desestructuración para acceder a los valores

        var datos = {
            nombre: nombre,
            imagenurl: imagenurl,
            mensajeEnviado: mensajeEnviado
        };

        console.log('Datos a enviar:', datos);

        // Crear y agregar el mensaje al contenedor
        agregarMensajeAlDOM(mensajeEnviado, imagenurl);

        // Enviar el mensaje por el socket
        socket.send(JSON.stringify(datos));

    } catch (error) {
        console.error('Error al manejar el mensaje:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un problema al enviar el mensaje.',
        });
    }
});

// Función para agregar un mensaje al DOM
function agregarMensajeAlDOM(mensaje, imagenurl) {
    // Obtener el contenedor principal de mensajes
    const contenedorMensajes = document.getElementById('contenedorMensajes');

    // Crear contenedor principal del mensaje
    const contenedorMensaje = document.createElement('div');
    contenedorMensaje.className = 'cont-mensaje-jugador-enviado';

    // Crear el div 'jugador-envia'
    const jugadorEnvia = document.createElement('div');
    jugadorEnvia.className = 'jugador-envia';

    // Crear el div 'tu-chat' con el nombre del jugador
    const tuChat = document.createElement('div');
    tuChat.className = 'tu-chat';
    tuChat.textContent = 'Tu'; // 'Tú' o el nombre del jugador

    // Crear el div 'avatar-chat'
    const avatarChat = document.createElement('div');
    avatarChat.className = 'avatar-chat';

    const avatarImg = document.createElement('img');
    avatarImg.src = imagenurl; 
    avatarImg.alt = 'Avatar jugador'; 


    avatarChat.appendChild(avatarImg);

    // Crear el div 'mensaje-jugador-enviado' con el texto del mensaje
    const mensajeJugador = document.createElement('div');
    mensajeJugador.className = 'mensaje-jugador-enviado';
    mensajeJugador.textContent = mensaje;

    // Construir la estructura del mensaje
    jugadorEnvia.appendChild(tuChat);
    jugadorEnvia.appendChild(avatarChat);
    contenedorMensaje.appendChild(jugadorEnvia);
    contenedorMensaje.appendChild(mensajeJugador);

    // Agregar el nuevo mensaje al contenedor principal
    contenedorMensajes.appendChild(contenedorMensaje);
}


// MENSAJES RECIBIDOS
socket.onmessage = (event) => {
    let data = JSON.parse(event.data);

    // console.log(data)

    const nombreJugador = data.nombre;
    const mensaje = data.mensajeEnviado;
    const avatar = data.imagenurl;

    // Crear el contenedor principal del mensaje recibido
    const contMensajeRecibido = document.createElement('div');
    contMensajeRecibido.classList.add('cont-mensaje-recibido');

    // Crear el subcontenedor "jugador-recibido"
    const jugadorRecibido = document.createElement('div');
    jugadorRecibido.classList.add('jugador-recibido');

    // Crear el elemento "nombre-jugador-recibe"
    const nombreJugadorRecibe = document.createElement('div');
    nombreJugadorRecibe.classList.add('nombre-jugador-recibe');
    nombreJugadorRecibe.innerText = nombreJugador; // Nombre del remitente

    // Crear el elemento "avatar-chat-recibe"
    const avatarChatRecibe = document.createElement('div');
    avatarChatRecibe.classList.add('avatar-chat-recibe');

    const avatarImg = document.createElement('img');
    avatarImg.src = avatar; 
    avatarImg.alt = 'Avatar jugador'; 


    avatarChatRecibe.appendChild(avatarImg);

    // Crear el elemento "mensaje-jugador-recibido"
    const mensajeJugadorRecibido = document.createElement('div');
    mensajeJugadorRecibido.classList.add('mensaje-jugador-recibido');
    mensajeJugadorRecibido.innerText = mensaje; // Texto del mensaje recibido

    // Construir la estructura
    jugadorRecibido.appendChild(nombreJugadorRecibe); // Agregar nombre al subcontenedor
    jugadorRecibido.appendChild(avatarChatRecibe);   // Agregar avatar al subcontenedor

    contMensajeRecibido.appendChild(jugadorRecibido); // Agregar subcontenedor al contenedor principal
    contMensajeRecibido.appendChild(mensajeJugadorRecibido); // Agregar mensaje al contenedor principal

    // Agregar el contenedor principal al DOM
    const contenedorMensajes = document.getElementById('contenedorMensajes');
    contenedorMensajes.appendChild(contMensajeRecibido);
};



