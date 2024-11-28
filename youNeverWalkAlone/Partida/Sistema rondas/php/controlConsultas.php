<?php 

class ConsultasNiveles extends Conexion {
    // Obtener progreso del jugador
    public function obtenerProgresoJugador($jugador) {
        try {
            $numeroDocumento = $jugador->getNumeroDocumento();
            $sqlObtenerProgreso = "
                SELECT rj.numerodocumento, jp.ronda, jp.nivel
                FROM jugador_partida AS jp
                INNER JOIN registro_jugador AS rj
                ON jp.jugadorpartidaid = rj.jugadorid
                WHERE rj.numerodocumento = :numerodocumento
            ";
            $stmt = $this->ejecutar($sqlObtenerProgreso, [':numerodocumento' => $numeroDocumento]);
            $resultado = $stmt->fetch();
            return $resultado;
        } catch (PDOException $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    // Actualizar progreso del jugador
    public function actualizarProgresoJugador($numerodocumento, $nivel, $ronda) {
        try {
            // Usar subconsulta en lugar de INNER JOIN
            $sqlUpdate = "
                UPDATE jugador_partida
                SET nivel = :nivel, ronda = :ronda
                WHERE jugadorid = (
                    SELECT jugadorid
                    FROM registro_jugador
                    WHERE numerodocumento = :numerodocumento
                );
            ";
    
            $this->ejecutar($sqlUpdate, [
                ':nivel' => $nivel,
                ':ronda' => $ronda,
                ':numerodocumento' => $numerodocumento
            ]);
    
            return ['success' => true, 'mensaje' => 'Progreso actualizado correctamente'];
        } catch (PDOException $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
}


?>
