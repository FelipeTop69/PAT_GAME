<?php 

require_once '../../Conexion/conexion.php';
require_once 'controlConsultas.php';
require_once '../../PrePartida/Registro/php/jugador.php';

session_start(); 
// session_destroy();

$tipo_consulta = $_POST['tipo_operacion'] ?? '';

switch ($tipo_consulta) {
    case 'obtener_nombre_jugador':
        if (isset($_SESSION['jugador'])) {
            $jugador = new Jugador(
                $_SESSION['jugador']['numerodocumento'],
                $_SESSION['jugador']['nombre']
            );

            $resultado = $jugador->getNombre();
            echo json_encode($resultado);
        } else {
            echo json_encode(['error' => 'Sesión no activa.']);
        }
        break;
}
?>