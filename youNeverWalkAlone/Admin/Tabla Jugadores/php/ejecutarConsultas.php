<?php 

require_once '../../../Conexion/conexion.php';
require_once './controlConsultas.php';
require_once '../../../PrePartida/Registro/php/jugador.php';

$tipo_consulta = $_POST['tipo_operacion'] ?? '';

switch ($tipo_consulta) {
    case 'listar_jugadores':
        $consulta = new ConsultasAdmin();
        $jugadores = $consulta->consultarJugadores();
        echo json_encode($jugadores);
        break;

    case 'eliminar_todo':
        $consultas = new ConsultasAdmin();
        $resultado = $consultas->eliminar_todo();
        echo json_encode(['mensaje' => 'Se limpio la BD']);
    break;


    default:
        echo json_encode(['error' => 'Operación no reconocida']);
        break;
}
?>
