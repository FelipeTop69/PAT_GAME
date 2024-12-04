const modal = document.getElementById("modall");
const enviarBtn = document.getElementById("enviarBtnn");
const closeBtn = document.querySelector(".close");

// Mostrar el modal cuando se haga clic en el botón de enviar
enviarBtnn.onclick = function() {
  modal.style.display = "flex"; // Cambia a flex para centrar el contenido
}

// Cerrar el modal cuando se haga clic en la 'X'
closeBtn.onclick = function() {
  modal.style.display = "none";
}

