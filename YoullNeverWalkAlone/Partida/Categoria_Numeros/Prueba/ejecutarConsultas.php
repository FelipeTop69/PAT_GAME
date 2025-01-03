<?php 

require_once '../../../Conexion/conexion.php';
require_once './ConsultasControl.php';

$tipo_consulta = $_POST['tipo_operacion'];

switch ($tipo_consulta) {

    case 'listar':
        $consultas = new consultas();
        $data = $consultas->select_persona();
        echo json_encode($data);
        break;
    
    case 'guardar_puntos':
        $puntos =  $_POST['puntos'];
    
        $consultas = new consultas();
        $resultados = $consultas->guardar_puntos($puntos);
        echo json_encode($resultados);
        break;

    default:
        break;
}
?>