function obtenerProgresoJugador(jugadorId) {
    const url = 'Sistema rondas/php/ejecutarConsultas.php';

    const formData = new FormData();
    formData.append('jugadorId', jugadorId);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const { nivel, ronda } = data;
            console.log(`Nivel actual: ${nivel}, Ronda actual: ${ronda}`);
            // Usar el nivel y ronda actuales para continuar con el flujo del juego
        } else {
            console.log('Error al obtener el progreso del jugador:', data.error);
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
}