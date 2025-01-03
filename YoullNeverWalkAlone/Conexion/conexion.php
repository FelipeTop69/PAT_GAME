<?php
class Conexion {
    private $dsn;
    private $server;
    private $usuario;
    private $baseDatos;
    private $password;

    public function __construct() {
        $this->server = 'localhost';
        $this->usuario = 'postgres';
        $this->baseDatos = 'bd_pat';
        $this->password = 'felipeBit69*';
    }

    public function conectar() {
        $dsn = 'pgsql:host=' . $this->server . ';dbname=' . $this->baseDatos;
        try {
            $conexion = new PDO($dsn, $this->usuario, $this->password);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Conexión Exitosa Gente";
        } catch (PDOException $e) {
            echo "Error al conectar a la base de datos: " . $e->getMessage();
        }
        return $conexion;
    }

    public function ejecutar($sql, $valores = []) {
        try {
            $pdo = $this->conectar();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($valores);
            return $stmt;
        } catch (PDOException $e) {
            throw new PDOException($e->getMessage());
        }
    }

}

// Crear una instancia de la clase y probar la conexión
// $conexion = new conexion();
// $conexion->conectar();
?>