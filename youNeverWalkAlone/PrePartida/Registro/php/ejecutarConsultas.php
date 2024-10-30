<?php 

require_once '../../../Conexion/conexion.php';
require_once './controlConsultas.php';

$tipo_consulta = $_POST['tipo_operacion'] ?? '';

switch($tipo_consulta){

    case 'registrar_jugador':

        $numeroDocumento = $_POST['txtNumeroDocumento'];
        $nombre = $_POST['txtNombre'];

        $consulta = new ConsultasRegistro;

        $respuesta = $consulta->registrarJugador($numeroDocumento, $nombre);

        echo json_encode($respuesta);

        break;


}

?>