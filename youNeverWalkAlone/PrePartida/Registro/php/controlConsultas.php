<?php 

    class ConsultasRegistro extends Conexion{

        // Obtener avatar aleatorio
        public function obtenerAvatarAleatorio() {
            $sql = Conexion::conectar()->prepare("SELECT avatarid FROM avatares ORDER BY RANDOM() LIMIT 1");
            $sql->execute();
            return $sql->fetchColumn(); // Devuelve solo el avatarID
        }

        // Verificar si el numero de documento ya esta registrado en la bd
        public function verificarExitenciaJugador($numeroDocumento) {
            $sql = Conexion::conectar()->prepare("SELECT COUNT(*) FROM registro_jugador WHERE numerodocumento = :numerodocumento");
            $sql->execute([':numerodocumento' => $numeroDocumento]);
            return $sql->fetchColumn(); // Retorna el número de coincidencias
        }

        public function registrarJugador($numeroDocumento, $nombre) {

            if ($this->verificarExitenciaJugador($numeroDocumento) > 0) {
                return ['error' => 'El Número de Documento ya está Registrado'];
            }

            // Obtener un avatar aleatorio
            $avatarID = $this->obtenerAvatarAleatorio();

            // Sentenica para hacer el registro
            $sqlJugador = Conexion::conectar()->prepare("INSERT INTO registro_jugador (numerodocumento, nombre, avatarid) VALUES (:numerodocumento, :nombre, :avatarid) RETURNING jugadorid");
            $sqlJugador->execute([':numerodocumento' => $numeroDocumento, ':nombre' => $nombre, ':avatarid' => $avatarID]);

            $jugadorID = $sqlJugador->fetchColumn(); // Obtener el ID del nuevo jugador


            // Insertar en jugador_partida con puntuación inicial de 0
            $sqlPartida = Conexion::conectar()->prepare("INSERT INTO jugador_partida (puntuacion, jugadorid) VALUES (0, :jugadorid)");
            $sqlPartida->execute([':jugadorid' => $jugadorID]);

            // Retornar todos los registros después de la inserción
            return ['mensaje' => 'Jugador Registrado'];
        }

    }
?>