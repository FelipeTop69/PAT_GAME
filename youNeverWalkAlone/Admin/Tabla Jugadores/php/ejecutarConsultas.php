<?php 

require_once '../../../Conexion/conexion.php';
require_once './controlConsultas.php';

$tipo_consulta = $_POST['tipo_operacion'] ?? '';

switch ($tipo_consulta) {
    case 'listar_jugadores':
        $consulta = new ConsultasAdmin();
        $jugadores = $consulta->consultarJugadores();
        echo json_encode($jugadores);
        break;


    default:
        echo json_encode(['error' => 'Operación no reconocida']);
        break;
}
?>
