<?php
session_start();
require_once '../../../Conexion/conexion.php';
require_once './controlConsultas.php';
require_once './jugador.php';

// Verifica si el jugador está en sesión
if (isset($_SESSION['jugador'])) {
    $jugador = new Jugador($_SESSION['jugador']['numerodocumento'], $_SESSION['jugador']['nombre']);
    $consulta = new ConsultasRegistro();
    $resultado = $consulta->eliminarJugador($jugador);
    if (isset($resultado['mensaje'])) {
        session_unset();
        session_destroy();
        echo json_encode([
            'status' => 'success',
            'message' => 'La sesión se ha cerrado y el jugador ha sido eliminado.'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error al eliminar el jugador.'
        ]);
    }
    exit;
}

// Si no hay sesión activa
echo json_encode([
    'status' => 'error',
    'message' => 'No hay sesión activa.'
]);

?>