<?php 

class ConsultasAdmin extends Conexion {

    public function consultarCategorias() {
        $sql = "SELECT idCategoria, nombre FROM categoria WHERE activo = 1 ORDER BY idCategoria ASC";
        $stmt = $this->ejecutar($sql);
        return $stmt->fetchAll();
    }

    public function exitenciaPartida() {
        try {
            $sql = "SELECT COUNT(*) FROM configuracion";
            $stmt = $this->ejecutar($sql);
            return $stmt->fetchColumn();
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function enviarConfiguracion($configuracionData) {
        try{
            $sql = "INSERT INTO configuracion(
                memorizarfacil, ordenarfacil, 
                memorizarmedio, ordenarmedio, 
                memorizardificil, ordenardificil, idcategoria
            ) 
            VALUES 
            (:memoFacil, :ordFacil, :memoMedio, :ordMedio, :memoDificil, :ordDificil, :idcategoria)";
            $this->ejecutar($sql, [
                ':memoFacil' => $configuracionData['visualFacil'],
                ':ordFacil' => $configuracionData['respuestaFacil'],
                ':memoMedio' => $configuracionData['visualMedio'],
                ':ordMedio' => $configuracionData['respuestaMedio'],
                ':memoDificil' => $configuracionData['visualDificil'],
                ':ordDificil' => $configuracionData['respuestaDificil'],
                ':idcategoria' => $configuracionData['categoria'],
            ]);
            return ['mensaje' => 'Configuración enviada'];
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function consultarJugadores() {
        $sql = "
            SELECT jp.jugadorpartidaid, rj.numerodocumento, a.imagenurl, rj.nombre, jp.puntuacion, jp.nivel, jp.ronda
            FROM jugador_partida jp
            JOIN registro_jugador rj ON jp.jugadorid = rj.jugadorid
            JOIN avatares a ON rj.avatarid = a.avatarid
            ORDER BY jp.jugadorpartidaid ASC
        ";
        $stmt = $this->ejecutar($sql);
        return $stmt->fetchAll();
    }

    public function eliminar_todo() {

        // Truncar las tablas y reiniciar sus IDs
        $sqlTruncate = "TRUNCATE TABLE registro_jugador RESTART IDENTITY CASCADE";
        $this->ejecutar($sqlTruncate);

        $sqlTruncate = "TRUNCATE TABLE configuracion RESTART IDENTITY CASCADE";
        $this->ejecutar($sqlTruncate);

        return ['mensaje' => 'Todos los registros y sesiones se han eliminado'];
    }
    
}

?>