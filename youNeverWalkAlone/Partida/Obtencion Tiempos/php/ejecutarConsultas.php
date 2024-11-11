<?php 

require_once '../../../Conexion/conexion.php';
require_once './controlConsultas.php';
require_once '../../../PrePartida/Registro/php/jugador.php';

session_start(); 
// session_destroy();

$tipo_consulta = $_POST['tipo_operacion'] ?? '';

switch ($tipo_consulta) {

    case 'obtener_tiempos':
        if (isset($_SESSION['jugador'])) {
            $consulta = new ConsultasTiempo();
            $tiempos = $consulta->consultarTiempos();
            echo json_encode($tiempos);
        } else {
            echo json_encode(['error' => 'No tienes permiso para ver esta información. Inicia sesión.']);
        }
        break;


    default:
        echo json_encode(['error' => 'Operación no reconocida']);
        break;
}
?>
