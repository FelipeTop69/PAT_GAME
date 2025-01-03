<?php 
require_once '../../../Conexion/conexion.php';
require_once './controlConsultas.php';
require_once '../../../PrePartida/Registro/php/jugador.php';

session_start();

// header('Content-Type: application/json'); // Asegura que la respuesta siempre sea JSON

$tipo_consulta = $_POST['tipo_operacion'];

switch ($tipo_consulta) {

    case 'obtener_categoria':
        $consulta = new ConsultasNiveles();
        $resultado = $consulta->obtenerCategoria();
        if(isset($resultado['error'])){
            echo json_encode(['error' => 'Error al obtener la categoría', 'details' => $resultado['error']]);
        }else{
            echo json_encode($resultado);
        };
        break;

    case 'obtener_progreso':
        if (isset($_SESSION['jugador'])) {
            $jugador = new Jugador(
                $_SESSION['jugador']['numerodocumento'],
                $_SESSION['jugador']['nombre']
            );

            $consulta = new ConsultasNiveles();
            $resultado = $consulta->obtenerProgresoJugador($jugador);

            if($resultado){
                echo json_encode($resultado);
            }else{
                echo json_encode(['error' => 'Progreso no encontrado']);
            }
        
        } else {
            echo json_encode(['error' => 'Debes iniciar sesión para actualizar la puntuación']);
        }
        break;

    case 'actualizar_progreso':
        if (isset($_POST['numerodocumento'], $_POST['nivel'], $_POST['ronda'])) {
            $numerodocumento = $_POST['numerodocumento'];
            $nivel = $_POST['nivel'];
            $ronda = $_POST['ronda'];

            $consulta = new ConsultasNiveles();
            $resultado = $consulta->actualizarProgresoJugador($numerodocumento, $nivel, $ronda);

            if ($resultado['success']) {
                echo json_encode(['success' => true, 'mensaje' => $resultado['mensaje']]);
            } else {
                echo json_encode(['success' => false, 'error' => $resultado['error']]);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Faltan parámetros para actualizar el progreso']);
        }
        break;

    default:
        echo json_encode(['error' => 'Operación no válida']);
        break;
}
?>
