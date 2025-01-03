<?php 

class ConsultasTiempo extends Conexion {
    

    public function consultarTiempos() {
        $sql = "
            SELECT memorizarFacil, ordenarFacil, 
            memorizarMedio, ordenarMedio, 
            memorizarDificil, ordenarDificil
            FROM configuracion
            WHERE id_configuracion = 1
        ";
        $stmt = $this->ejecutar($sql);
        return $stmt->fetchAll();
    }
    
}

?>