const chatBox = document.getElementById('chat-box');
        const chatInput = document.getElementById('chat-input');

        // Función para enviar mensajes
        function enviarMensaje() {
            const mensaje = chatInput.value.trim();
            if (mensaje !== "") { 
                addMensaje(mensaje, 'usuario');
                chatInput.value = '';
            }
        }

        // Función para que se use el teclado 'enter' para enviar el mensaje
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                enviarMensaje();
            }
        });

        // Función para añadir el mensaje y que aparezca en el HTML
        function addMensaje(mensaje, enviando) {
            const mensajeElemento = document.createElement('div');
            mensajeElemento.classList.add('chat-mensaje', enviando);
            mensajeElemento.innerHTML = `<p>${mensaje}</p>`;
            chatBox.appendChild(mensajeElemento);
            chatBox.scrollTop = chatBox.scrollHeight; 
        }

// Selecciona todos los checkboxes y sus labels
const checkboxes = document.querySelectorAll('.checkbox');
const labels = document.querySelectorAll('.checkbox-label');

labels.forEach((label,index) => {
    label.addEventListener('click', function () {
    // Alterna la clase 'checked' según el estado del checkbox
    if (checkboxes[index].checked) {
        label.classList.remove('checked');
        } else {
            label.classList.add('checked');
        }
    });
});