document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');

    // Función para agregar un nuevo mensaje enviado al chat
    function addMessage() {
        const messageText = inputField.value.trim();

        if (messageText === "") {
            return; // No enviar mensajes vacíos
        }

        // Crear un nuevo elemento de mensaje
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');

        // Estructura del mensaje enviado
        messageElement.innerHTML = `
            <img src="img/user-avatar.png" alt="Tú" class="avatar">
            <div class="message-content">
                <p>${messageText}</p>
                <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;

        // Añadir el nuevo mensaje al contenedor de mensajes
        chatMessages.appendChild(messageElement);

        // Desplazar el chat hacia abajo para ver el nuevo mensaje
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Limpiar el campo de texto
        inputField.value = "";
    }

    // Evento para el botón de enviar
    sendButton.addEventListener('click', function() {
        addMessage();
    });

    // Permitir enviar mensaje con la tecla Enter
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addMessage();
        }
    });
});
