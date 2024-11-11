<?php 

require_once '../../Conexion/conexion.php';
require_once './controlConsultas.php';
require_once '../../PrePartida/Registro/php/jugador.php';

session_start(); 
// session_destroy();

$tipo_consulta = $_POST['tipo_operacion'] ?? '';

switch ($tipo_consulta) {

    case 'listar_jugadores':
        if (isset($_SESSION['jugador'])) {
            $consulta = new ConsultasJugador();
            $jugadores = $consulta->consultarJugadores();
            echo json_encode($jugadores);
        } else {
            echo json_encode(['error' => 'No tienes permiso para ver esta información. Registrate.']);
        }
        break;

    default:
        echo json_encode(['error' => 'Operación no reconocida']);
        break;
}
?>
