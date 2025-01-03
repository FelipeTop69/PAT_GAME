<?php 

require_once '../../../Conexion/conexion.php';
require_once './controlConsultas.php';
require_once './jugador.php';

session_start(); 
// session_destroy();

$tipo_consulta = $_POST['tipo_operacion'] ?? '';

switch($tipo_consulta){

    case 'registrar_jugador':

        $numeroDocumento = $_POST['txtNumeroDocumento'];
        $nombre = $_POST['txtNombre'];

        $jugador = new Jugador($numeroDocumento, $nombre);
        $consulta = new ConsultasRegistro;

        if (!$consulta->sePermiteRegistro()) {
            echo json_encode(['limite' => 'No se permiten más registros. Límite alcanzado.']);
            exit;
        }

        $respuesta = $consulta->registrarJugador($jugador);

        if (isset($respuesta['error'])) {
            echo json_encode(['error' => $respuesta['error']]);
        } else {
            // Iniciar la sesion del jugador si el registro se completa
            $_SESSION['jugador'] = $jugador->toArray(); // Guardar los datos encapsulados en formato JSON para la sesion
            echo json_encode($respuesta);
        }

        break;

    case 'listar_jugadores':

        // Esta validacion es opcional ya que en la tabla se esta verificando si hay una sesion
        if (isset($_SESSION['jugador'])) {
            $consulta = new ConsultasRegistro();
            $jugadores = $consulta->consultarJugadores();
            if(empty($jugadores)){
                // Si no hay jugadores, destruir la sesión y enviar mensaje de error
                session_unset();
                session_destroy();
                echo json_encode(['error' => 'No hay jugadores registrados. Sesión cerrada.']);
            }else{
                echo json_encode($jugadores);
            }
        } else {
            echo json_encode(['error' => 'No tienes permiso para ver esta información. Inicia sesión.']);
        }
        break;

    case 'contador_jugadores':
        $consulta = new ConsultasRegistro();
        $jugadoresRegistrados = $consulta->contarJugadores();
        $limiteJugadores = ConsultasRegistro::obtenerLimiteJugadores();
    
        echo json_encode([
            'jugadoresRegistrados' => $jugadoresRegistrados,
            'limiteJugadores' => $limiteJugadores
        ]);
        break;

    case 'actualizar_puntuacion_jugador':
        if (isset($_SESSION['jugador'])) {
            $nuevaPuntuacion = $_POST['nueva_puntuacion'];

            $jugador = new Jugador(
                $_SESSION['jugador']['numerodocumento'],
                $_SESSION['jugador']['nombre']
            );
            $consulta = new ConsultasRegistro();
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
            $consulta = new ConsultasRegistro();
            $informacion = $consulta->obtenerInformacionJugador($jugador);
            echo json_encode($informacion);
        } else {
            echo json_encode(['error' => 'Sesión no activa.']);
        }
        break;

    case 'perfil_jugador':
        $tipo = $tipo_consulta;

        if (isset($_SESSION['jugador'])) {
            $jugador = new Jugador(
                $_SESSION['jugador']['numerodocumento'],
                $_SESSION['jugador']['nombre']
            );
            $consulta = new ConsultasRegistro();
            $perfil = $consulta->obtenerPerfilJugador($jugador);
            echo json_encode($perfil);
        } else {
            echo json_encode(['error' => 'Sesión no activa.']);
        }
        break;

    default:
    echo json_encode(['error' => 'Operación no reconocida']);
    break;



}

?>