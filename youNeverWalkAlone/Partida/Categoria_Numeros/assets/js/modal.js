const modal = document.getElementById("modal");
const enviarBtn = document.getElementById("enviarBtn");
const closeBtn = document.querySelector(".close");

// Mostrar el modal cuando se haga clic en el botón de enviar
enviarBtn.onclick = function() {
  modal.style.display = "flex"; // Cambia a flex para centrar el contenido
}

// Cerrar el modal cuando se haga clic en la 'X'
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}