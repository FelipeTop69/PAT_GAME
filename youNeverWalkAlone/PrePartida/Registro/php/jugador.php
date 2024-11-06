<?php 

    class Jugador{

        private $numeroDocumento;
        private $nombre;

        public function __construct($numeroDocumento, $nombre){
            $this->setNumeroDocumento($numeroDocumento);
            $this->setNombre($nombre);
        }

        public function setNumeroDocumento($numeroDocumento){
            $this->numeroDocumento = $numeroDocumento;
        }
        public function getNumeroDocumento(){
            return $this->numeroDocumento;
        }

        public function setNombre($nombre){
            $this->nombre = $nombre;
        }
        public function getNombre(){
            return $this->nombre;
        }

        public function toArray(){
            return [
                'numerodocumento' => $this->getNumeroDocumento(),
                'nombre' => $this->getNombre()
            ];
        }

    }

?>