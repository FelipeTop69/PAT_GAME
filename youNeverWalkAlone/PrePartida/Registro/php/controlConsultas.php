<?php 

    class ConsultasRegistro extends Conexion{

        // Obtener avatar aleatorio
        public function obtenerAvatarAleatorio() {
            $sql = Conexion::conectar()->prepare("SELECT avatarid FROM avatares ORDER BY RANDOM() LIMIT 1");
            $sql->execute();
            return $sql->fetchColumn(); // Devuelve solo el avatarID
        }

        public function consultarJugadores() {
            $sql = conexion::conectar()->prepare("
                SELECT jp.jugadorpartidaid, rj.numerodocumento, rj.nombre, a.imagenurl, jp.puntuacion 
                FROM jugador_partida jp
                JOIN registro_jugador rj ON jp.jugadorid = rj.jugadorid
                JOIN avatares a ON rj.avatarid = a.avatarid
                ORDER BY jp.jugadorpartidaid ASC
            ");
            $sql->execute();
            return $sql->fetchAll(PDO::FETCH_ASSOC);
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
            return self::consultarJugadores();
        }

        // Método para actualizar puntuación
    public function actualizarPuntuacionJugador($numeroDocumento, $nuevaPuntuacion) {
        // Obtener jugadorid basado en numeroDocumento
        $sqlObtenerJugador = conexion::conectar()->prepare("
            SELECT jugadorid FROM registro_jugador WHERE numerodocumento = :numerodocumento
        ");
        $sqlObtenerJugador->execute([':numerodocumento' => $numeroDocumento]);
        $jugadorid = $sqlObtenerJugador->fetchColumn();
    
        if ($jugadorid) {
            // Actualizar la puntuación en jugador_partida
            $sqlActualizarPuntuacion = conexion::conectar()->prepare("
                UPDATE jugador_partida SET puntuacion = :puntuacion WHERE jugadorid = :jugadorid
            ");
            $sqlActualizarPuntuacion->execute([
                ':puntuacion' => $nuevaPuntuacion,
                ':jugadorid' => $jugadorid
            ]);
            
            return ['mensaje' => 'Puntuación actualizada correctamente'];
        }
        return ['error' => 'Jugador no encontrado'];
    }

        public function obtenerPuntosJugador($numeroDocumento) {
            $sql = conexion::conectar()->prepare("
                SELECT jp.puntuacion 
                FROM jugador_partida jp
                JOIN registro_jugador rj ON jp.jugadorid = rj.jugadorid
                WHERE rj.numerodocumento = :numerodocumento
                LIMIT 1
            ");
            $sql->execute([':numerodocumento' => $numeroDocumento]);
            return $sql->fetchColumn(); // Retorna los puntos del jugador
        }

        public function eliminarJugador($numeroDocumento) {
            $sqlObtenerJugador = conexion::conectar()->prepare("SELECT jugadorid FROM registro_jugador WHERE numerodocumento = :numerodocumento");
            $sqlObtenerJugador->execute([':numerodocumento' => $numeroDocumento]);
            $jugadorid = $sqlObtenerJugador->fetchColumn();
    
            if ($jugadorid) {
                conexion::conectar()->prepare("DELETE FROM jugador_partida WHERE jugadorid = :jugadorid")->execute([':jugadorid' => $jugadorid]);
                conexion::conectar()->prepare("DELETE FROM registro_jugador WHERE jugadorid = :jugadorid")->execute([':jugadorid' => $jugadorid]);
                return ['mensaje' => 'Jugador eliminado correctamente'];
            }
            return ['error' => 'No se encontró el jugador especificado'];
        }

    }
?>