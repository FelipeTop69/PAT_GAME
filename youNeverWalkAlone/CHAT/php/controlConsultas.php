<?php 

    Class consultasChat extends Conexion{


        public function obtenerInformacionJugador($jugador) {
            $numeroDocumento = $jugador->getNumeroDocumento();
            $sql = "
                SELECT av.imagenurl, rj.nombre
                FROM jugador_partida jp
                JOIN registro_jugador rj 
                ON jp.jugadorid = rj.jugadorid
                JOIN avatares av
                ON av.avatarid = rj.avatarid
                WHERE rj.numerodocumento = :numerodocumento
                LIMIT 1
            ";
            $stmt = $this->ejecutar($sql, [':numerodocumento' => $numeroDocumento]);
            return $stmt->fetch();
        }

    }

?>