<?php 

    class ConsultasBandera extends Conexion {

        public function verificarExistenciaPartida(){

            $sql = 'SELECT id_configuracion FROM configuracion';
            $stmt = $this->ejecutar($sql);

            return $stmt->fetchColumn();
        }

        public function actualizarEstadoPartida(){
            
            $idConfiguracion = $this->verificarExistenciaPartida();

            if($idConfiguracion){
                $sql = 'UPDATE configuracion SET estado_partida = true WHERE id_configuracion = :idConfiguracion';
                $this->ejecutar($sql, [':idConfiguracion' => $idConfiguracion]);
                return ['correcto' => 'Estado Partida Actualizado correctamente'];
            }else{
                return ['mensaje' => 'No se encontro niguna partida!'];
            }

        }

        public function verificarEstadoPartida(){

            $sql = 'SELECT estado_partida FROM configuracion LIMIT 1';
            $stmt = $this->ejecutar($sql);

            $estado = $stmt->fetchColumn();

            if($estado === true){
                return ['mensaje' => 'iniciar_partida'];
            }else if($estado === false){
                return ['mensaje' => 'En espera...'];
            }else{
                return ['mensaje' => 'No se encontro estado'];
            }

        }

        public function selecionarCategoria(){

            $comprobar = $this->verificarExistenciaPartida();

            if($comprobar){
                $sql = 'SELECT idcategoria FROM configuracion WHERE idcategoria IN (1, 2, 3) LIMIT 1';
                $stmt = $this->ejecutar($sql);
                $resultado = $stmt->fetch();

                if ($resultado) { 
                    $selectedCategoryId = $resultado['idcategoria']; 
                } else { 
                    $selectedCategoryId = null; 
                }

                return ['idcategoria' => $selectedCategoryId];

            }else{
                return ['error' => 'No se encontro la categoria'];
            }

        }

    }

?>