<?php 

    require_once '../Conexion/conexion.php';
    require_once './controlConsultas.php';

    $tipoOperacion = $_POST['tipo_operacion'];

    switch($tipoOperacion){

        case 'verificar_existencia_partida':

            $consulta = new ConsultasBandera();
            $resultado = $consulta->verificarExistenciaPartida();

            echo json_encode($resultado);

            break;

        case 'actualizar_estado_partida':

            $consulta = new ConsultasBandera();
            $resultado = $consulta->actualizarEstadoPartida();

            echo json_encode($resultado);

            break;

        case 'verificar_estado_partida':
            $consulta = new ConsultasBandera();
            $resultado = $consulta->verificarEstadoPartida();

            echo json_encode($resultado);

            break;

        case 'seleccionar_categoria':
            $consulta = new ConsultasBandera();
            $resultado = $consulta->selecionarCategoria();

            echo json_encode($resultado);

            break;

        default:
            echo json_encode(['error' => 'Operación no reconocida']);
            break;

    }

?>