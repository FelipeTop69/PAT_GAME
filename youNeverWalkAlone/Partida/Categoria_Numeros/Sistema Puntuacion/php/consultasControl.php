<?php 

class ConsultasPuntuacion extends Conexion {
    

    public function listarPuntos() {
        $sql = "SELECT * FROM puntos ORDER BY puntos_obtenidos ASC";
        $stmt = $this->ejecutar($sql);
        return $stmt->fetchAll();
    }

    public function obtenerPuntos($numeroDucmento){
        $sql ="
        SELECT jp.puntuacion
        FROM jugador_partida AS jp
        INNER JOIN registro_jugador AS rj
        ON jp.jugadorpartidaid = rj.jugadorid
        WHERE rj.numerodocumento = :numeroDocumento
        LIMIT 1";

        $stmt = $this->ejecutar($sql, [':numeroDocumento' => $numeroDucmento]);
        return $stmt->fetchColumn();
    }


    // Guardar puntos en la base de datos
    public function actualizarPuntuacionJugador($jugador, $nuevaPuntuacion) {
        try {

            $numeroDocumento = $jugador->getNumeroDocumento();

            // Obtener jugadorid basado en numeroDocumento
            $sqlObtenerJugador = " SELECT jugadorid FROM registro_jugador WHERE numerodocumento = :numerodocumento";
            $stmt = $this->ejecutar($sqlObtenerJugador, [':numerodocumento' => $numeroDocumento]);
            $jugadorid = $stmt->fetchColumn();

            if($jugadorid){
                $puntosObtenidos = $this->obtenerPuntos($numeroDocumento);

                if ($puntosObtenidos) {
                    $nuevaPuntuacion += $puntosObtenidos;
                }
            
                // Actualizar los puntos acumulados
                $sqlUpdate = "UPDATE jugador_partida SET puntuacion = :puntosTotales WHERE jugadorid = :jugadorid";
                $stmt = $this->ejecutar($sqlUpdate, [
                    ':puntosTotales' => $nuevaPuntuacion,
                    ':jugadorid' => $jugadorid
                ]);

                return $nuevaPuntuacion;
            }
        } catch (PDOException $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    
}

?>