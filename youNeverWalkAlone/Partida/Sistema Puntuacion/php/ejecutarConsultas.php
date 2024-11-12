<?php 

require_once '../../../Conexion/conexion.php';
require_once './consultasControl.php';
require_once '../../../PrePartida/Registro/php/jugador.php';

session_start(); 
// session_destroy();

$tipo_consulta = $_POST['tipo_operacion'];

switch ($tipo_consulta) {

    case 'listar':
        if (isset($_SESSION['jugador'])) {
            $consultas = new ConsultasPuntuacion();
            $puntos = $consultas->listarPuntos();
            if(empty($puntos)){
                // Si no hay jugadores, destruir la sesión y enviar mensaje de error
                session_unset();
                session_destroy();
                echo json_encode(['error' => 'No hay jugadores registrados. Sesión cerrada.']);
            }else{
                echo json_encode($puntos);
            }
        }else{
            echo json_encode(['error' => 'No tienes permiso para ver esta información. Inicia sesión.']);
        }
        
        
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

    case 'obtener_informacion_jugador':
        if (isset($_SESSION['jugador'])) {
            $jugador = new Jugador(
                $_SESSION['jugador']['numerodocumento'],
                $_SESSION['jugador']['nombre']
            );
            $consulta = new ConsultasPuntuacion();
            $informacion = $consulta->obtenerInformacionJugador($jugador);
            echo json_encode($informacion);
        } else {
            echo json_encode(['error' => 'Sesión no activa.']);
        }
        break;

    default:
        break;
}
?>