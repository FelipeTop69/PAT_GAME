<?php 

require_once '../../../../Conexion/conexion.php';
require_once './consultasControl.php';
require_once '../../../../PrePartida/Registro/php/jugador.php';

session_start(); 
// session_destroy();

$tipo_consulta = $_POST['tipo_operacion'];

switch ($tipo_consulta) {

    case 'listar':
        $consultas = new ConsultasPuntuacion();
        $puntos = $consultas->listarPuntos();
        echo json_encode($puntos);
        break;
    
    case 'actualizar_puntuacion_jugador':
        if (isset($_SESSION['jugador'])) {
            $nuevaPuntuacion = $_POST['puntos_obtenidos'];

            $jugador = new Jugador(
                $_SESSION['jugador']['numerodocumento'],
                $_SESSION['jugador']['nombre']
            );

            $consulta = new ConsultasPuntuacion();
            $resultado = $consulta->actualizarPuntuacionJugador($jugador, $nuevaPuntuacion);
            
            echo json_encode($resultado);
        } else {
            echo json_encode(['error' => 'Debes iniciar sesión para actualizar la puntuación']);
        }
        break;

    default:
        break;
}
?>