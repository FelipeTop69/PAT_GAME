<?php 

require_once '../../../Conexion/conexion.php';
require_once './controlConsultas.php';

$tipo_operacion = $_POST['tipo_operacion'] ?? '';

switch ($tipo_operacion) {
    case 'obtener_categorias':
        $consulta = new ConsultasAdmin();
        $categorias = $consulta->consultarCategorias();
        echo json_encode($categorias);
        break;

    case 'existencia_partida':
        $consulta = new ConsultasAdmin();
        $partida = $consulta->exitenciaPartida();
        if (isset($partida['error'])) {
            echo json_encode(['error' => 'Error al consultar la partida', 'details' => $partida['error']]);
        }else{
            echo json_encode($partida);
        }
        break;

    case 'configuracion_partida':
        $configuracionData = [
            'visualFacil' => $_POST['txtVisualFacil'],
            'respuestaFacil' => $_POST['txtRespuestaFacil'],
            'visualMedio' => $_POST['txtVisualMedio'],
            'respuestaMedio' => $_POST['txtRespuestaMedio'],
            'visualDificil' => $_POST['txtVisualDificil'],
            'respuestaDificil' => $_POST['txtRespuestaDificil'],
            'categoria' => $_POST['categoria'],
        ];
        $consulta = new ConsultasAdmin();
        $configuracion = $consulta->enviarConfiguracion($configuracionData); 
        if (isset($configuracion['error'])) {
            echo json_encode(['error' => 'Error al enviar la configuración', 'details' => $configuracion['error']]);
        }else{
            echo json_encode($configuracion['mensaje']);
        }
        break;

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
