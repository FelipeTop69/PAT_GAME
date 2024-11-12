<?php 

class ConsultasPuntuacion extends Conexion {
    

    public function listarPuntos() {
        $sql = "SELECT * FROM puntos ORDER BY puntos_obtenidos ASC";
        $stmt = $this->ejecutar($sql);
        return $stmt->fetchAll();
    }

    public function obtenerPuntos(){
        $sql ="SELECT puntos_obtenidos FROM puntos LIMIT 1 ";
        $stmt = $this->ejecutar($sql);
        return $stmt->fetchColumn();
    }


    // Guardar puntos en la base de datos
    public function actualizarPuntos($puntosTotales) {
        try {
            
            $puntosObtenidos = $this->obtenerPuntos();
    
            // Si ya existen puntos, acumular; si no, simplemente almacenar los nuevos puntos
            if ($puntosObtenidos) {
                $puntosTotales += $puntosObtenidos;
            }
    
            // Actualizar los puntos acumulados
            $sqlUpdate = "UPDATE puntos SET puntos_obtenidos = :puntosTotales WHERE id_puntos = 1";
            $this->ejecutar($sqlUpdate, [':puntosTotales' => $puntosTotales]);
    
            return self::listarPuntos();
    
        } catch (PDOException $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    
}

?>