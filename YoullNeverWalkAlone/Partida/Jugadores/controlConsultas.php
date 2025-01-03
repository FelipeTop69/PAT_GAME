<?php 

class ConsultasJugador extends Conexion {

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


}

?>