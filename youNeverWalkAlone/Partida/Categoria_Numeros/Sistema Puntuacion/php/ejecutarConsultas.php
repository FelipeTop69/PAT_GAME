<?php 

require_once '../../../../Conexion/conexion.php';
require_once './consultasControl.php';

$tipo_consulta = $_POST['tipo_operacion'];

switch ($tipo_consulta) {

    case 'listar':
        $consultas = new ConsultasPuntuacion();
        $puntos = $consultas->listarPuntos();
        echo json_encode($puntos);
        break;
    
    case 'actualizar_puntos':
        $puntos =  $_POST['puntos'];
    
        $consultas = new ConsultasPuntuacion();
        $puntosActualizados = $consultas->actualizarPuntos($puntos);
        echo json_encode($puntosActualizados);
        break;

    default:
        break;
}
?>