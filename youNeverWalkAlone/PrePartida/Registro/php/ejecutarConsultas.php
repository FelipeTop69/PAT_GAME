<?php 
session_start(); 
// session_destroy();

require_once '../../../Conexion/conexion.php';
require_once './controlConsultas.php';

$tipo_consulta = $_POST['tipo_operacion'] ?? '';

switch($tipo_consulta){

    case 'registrar_jugador':

        $numeroDocumento = $_POST['txtNumeroDocumento'];
        $nombre = $_POST['txtNombre'];

        

        $consulta = new ConsultasRegistro;
        $respuesta = $consulta->registrarJugador($numeroDocumento, $nombre);

        if (isset($respuesta['error'])) {
            echo json_encode(['error' => $respuesta['error']]);
        } else {
            // Iniciar la sesión del jugador si el registro fue exitoso
            $_SESSION['jugador'] = [
                'nombre' => $nombre,
                'numerodocumento' => $numeroDocumento
            ];
            echo json_encode($respuesta);
        }

        break;

    case 'listar_jugadores':

        // Esta validacion es opcional ya que en la tabla se esta verificando si hay una sesion
        if (isset($_SESSION['jugador'])) {
            $consulta = new ConsultasRegistro();
            $jugadores = $consulta->consultarJugadores();
            echo json_encode($jugadores);
        } else {
            echo json_encode(['error' => 'No tienes permiso para ver esta información. Inicia sesión.']);
        }
        break;

    case 'actualizar_puntuacion_jugador':
        if (isset($_SESSION['jugador'])) {
            $nuevaPuntuacion = $_POST['nueva_puntuacion'];
            $numeroDocumento = $_SESSION['jugador']['numerodocumento'];
            
            $consulta = new ConsultasRegistro();
            $resultado = $consulta->actualizarPuntuacionJugador($numeroDocumento, $nuevaPuntuacion);
            echo json_encode($resultado);
        } else {
            echo json_encode(['error' => 'Debes iniciar sesión para actualizar la puntuación']);
        }
        break;

    case 'obtener_puntos':
        if (isset($_SESSION['jugador'])) {
            $consulta = new ConsultasRegistro();
            $puntos = $consulta->obtenerPuntosJugador($_SESSION['jugador']['numerodocumento']);
            echo json_encode(['puntos' => $puntos]);
        } else {
            echo json_encode(['error' => 'Sesión no activa.']);
        }
        break;

    case 'eliminar_jugador':
        if (isset($_SESSION['jugador'])) {
            $numeroDocumento = $_SESSION['jugador']['numerodocumento'];
            $consulta = new ConsultasRegistro();
            $resultado = $consulta->eliminarJugador($numeroDocumento);
            echo json_encode($resultado);
        } else {
            echo json_encode(['error' => 'Debes iniciar sesión para realizar esta acción']);
        }
        break;


}

?>