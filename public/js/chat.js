let socket = io('http://localhost:8083');

socket.on('conectado', function() {
    alert("Conectado");
});

socket.on('difundir', function (datos) {
    let chat = document.getElementById('chat');
    chat.innerHTML += '<p><em>' + datos.nick + '</em>: ' + datos.texto + '</p>';
    chat.scrollTop = chat.scrollHeight;
});

function enviar(event) {

    if(event) event.preventDefault();

    const form = document.getElementById('formulario');
    const nickInput = document.getElementById('nick');
    const textoInput = document.getElementById('texto');

    if(!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const nick = nickInput.value.trim();
    const texto = textoInput.value.trim();

    if(texto !== "" && nick !== ""){
        socket.emit('enviar', {nick: nick, texto: texto});
        textoInput.value = "";
        textoInput.focus();
    }
}