<?php 

    class ConsultasRegistro extends Conexion{

        public function obtenerAvatarAleatorio() {
            $sql = "SELECT avatarid FROM avatares ORDER BY RANDOM() LIMIT 1";
            $stmt = $this->ejecutar($sql);
            return $stmt->fetchColumn(); // Devuelve solo el avatarID
        }

        public function verificarExitenciaJugador($numeroDocumento) {
            $sql = "SELECT COUNT(*) FROM registro_jugador WHERE numerodocumento = :numerodocumento";
            $stmt = $this->ejecutar($sql, [':numerodocumento' => $numeroDocumento]);
            return $stmt->fetchColumn(); // Retorna el número de coincidencias
        }

        public function consultarJugadores() {
            $sql = "
                SELECT jp.jugadorpartidaid, rj.numerodocumento, rj.nombre, a.imagenurl, jp.puntuacion 
                FROM jugador_partida jp
                JOIN registro_jugador rj ON jp.jugadorid = rj.jugadorid
                JOIN avatares a ON rj.avatarid = a.avatarid
                ORDER BY jp.jugadorpartidaid ASC
            ";
            $stmt = $this->ejecutar($sql);
            return $stmt->fetchAll();
        }

        public function registrarJugador($jugador) {

            $numeroDocumento = $jugador->getNumeroDocumento();
            $nombre = $jugador-> getNombre();
            
            if ($this->verificarExitenciaJugador($numeroDocumento) > 0) {
                return ['error' => 'El N° de documento ya está registrado'];
            }

            $avatarID = $this->obtenerAvatarAleatorio();

            $sqlJugador = "INSERT INTO registro_jugador (numerodocumento, nombre, avatarid) VALUES (:numerodocumento, :nombre, :avatarid) RETURNING jugadorid";
            $stmt = $this->ejecutar($sqlJugador,[':numerodocumento' => $numeroDocumento, ':nombre' => $nombre, ':avatarid' => $avatarID]);

            $jugadorID = $stmt->fetchColumn(); // Obtener el ID del nuevo jugador

            $sqlPartida = "INSERT INTO jugador_partida (puntuacion, jugadorid) VALUES (0, :jugadorid)";
            $this->ejecutar($sqlPartida, [':jugadorid' => $jugadorID]);

            // Retornar todos los registros después de la inserción
            return self::consultarJugadores();
        }


        public function actualizarPuntuacionJugador($jugador, $nuevaPuntuacion) {

            $numeroDocumento = $jugador->getNumeroDocumento();

            // Obtener jugadorid basado en numeroDocumento
            $sqlObtenerJugador = " SELECT jugadorid FROM registro_jugador WHERE numerodocumento = :numerodocumento";
            $stmt = $this->ejecutar($sqlObtenerJugador, [':numerodocumento' => $numeroDocumento]);
            $jugadorid = $stmt->fetchColumn();
        
            if ($jugadorid) {
                // Actualizar la puntuación en jugador_partida
                $sqlActualizarPuntuacion = " UPDATE jugador_partida SET puntuacion = :puntuacion WHERE jugadorid = :jugadorid";
                $stmt = $this->ejecutar($sqlActualizarPuntuacion, [
                    ':puntuacion' => $nuevaPuntuacion,
                    ':jugadorid' => $jugadorid
                ]);

                return ['mensaje' => 'Puntuación actualizada correctamente'];
            }
            return ['error' => 'Jugador no encontrado'];
        }

        public function obtenerInformacionJugador($jugador) {
            $numeroDocumento = $jugador->getNumeroDocumento();
            $sql = "
                SELECT jp.puntuacion, rj.nombre
                FROM jugador_partida jp
                JOIN registro_jugador rj ON jp.jugadorid = rj.jugadorid
                WHERE rj.numerodocumento = :numerodocumento
                LIMIT 1
            ";
            $stmt = $this->ejecutar($sql, [':numerodocumento' => $numeroDocumento]);
            return $stmt->fetch();
        }

        public function eliminarJugador($jugador) {

            $numeroDocumento = $jugador->getNumeroDocumento();

            $sqlObtenerJugador = "SELECT jugadorid FROM registro_jugador WHERE numerodocumento = :numerodocumento";
            $stmt = $this->ejecutar($sqlObtenerJugador, [':numerodocumento' => $numeroDocumento]);
            $jugadorid = $stmt->fetchColumn();
    
            if ($jugadorid) {
                $sqlEliminarJugadorPartida = "DELETE FROM jugador_partida WHERE jugadorid = :jugadorid";
                $sqlEliminarRegistroJugador = "DELETE FROM registro_jugador WHERE jugadorid = :jugadorid";
                $this->ejecutar($sqlEliminarJugadorPartida, [':jugadorid' => $jugadorid]);
                $this->ejecutar($sqlEliminarRegistroJugador, [':jugadorid' => $jugadorid]);
                return ['mensaje' => 'Jugador eliminado correctamente'];
            }
            return ['error' => 'No se encontró el jugador especificado'];
        }

    }
?>