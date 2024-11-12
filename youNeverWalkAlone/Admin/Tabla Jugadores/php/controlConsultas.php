<?php 

class ConsultasAdmin extends Conexion {

    public function consultarJugadores() {
        $sql = "
            SELECT jp.jugadorpartidaid, rj.numerodocumento, a.imagenurl, rj.nombre, jp.puntuacion 
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