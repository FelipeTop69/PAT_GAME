<?php 

class consultas extends conexion {
    

    public function select_persona() {
        $sql = conexion::conectar()->prepare("
            SELECT * FROM puntos ORDER BY puntos_obtenidos ASC
        ");
        $sql->execute();
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerPuntos(){
        $sql = conexion::conectar()->prepare("
            SELECT puntos_obtenidos FROM puntos LIMIT 1
        ");
        $sql->execute();
        return $sql->fetchColumn();
    }


    // Guardar puntos en la base de datos
    public function guardar_puntos($puntosTotales) {
        // $sql = conexion::conectar()->prepare("UPDATE public.puntos SET puntos_obtenidos = :puntosTotales WHERE id_puntos = 1;");
        // $sql->execute([':puntosTotales' => $puntosTotales]);
        // return self::select_persona();
    
        try {
            
            $resultado = $this->obtenerPuntos();
    
            // Si ya existen puntos, acumular; si no, simplemente almacenar los nuevos puntos
            if ($resultado) {
                $puntosTotales += $resultado;
            }
    
            // Actualizar los puntos acumulados
            $sqlUpdate = conexion::conectar()->prepare("UPDATE puntos SET puntos_obtenidos = :puntosTotales WHERE id_puntos = 1");
            $sqlUpdate->execute([':puntosTotales' => $puntosTotales]);
    

            return self::select_persona();
            // if ($sqlUpdate->execute()) {
            //     return ['success' => true, 'mensaje' => 'Puntos acumulados correctamente'];
            // } else {
            //     return ['success' => false, 'error' => 'No se pudieron actualizar los puntos'];
            // }
    
        } catch (PDOException $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    
}

?>