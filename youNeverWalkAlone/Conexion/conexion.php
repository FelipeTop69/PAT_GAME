<?php
class conexion {
    private $dsn;
    private $server;
    private $usuario;
    private $baseDatos;
    private $password;

    public function __construct() {
        $this->server = 'localhost';
        $this->usuario = 'postgres';
        $this->baseDatos = 'bd_prueba_pat';
        $this->password = '1082803037';
    }

    public function conectar() {
        $dsn = 'pgsql:host=' . $this->server . ';dbname=' . $this->baseDatos;
        try {
            $conexion = new PDO($dsn, $this->usuario, $this->password);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Conexión exitosa a la base de datos";
        } catch (PDOException $e) {
            echo "Error al conectar a la base de datos: " . $e->getMessage();
        }
        return $conexion;
    }

}

// Crear una instancia de la clase y probar la conexión
// $conexion = new conexion();
// $conexion->conectar();
?>
