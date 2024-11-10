<?php
include("../../../Conexion/conexion.php");
$conexion = new Conexion();

if (isset($_POST['register'])) {
    $visualFacil = trim($_POST['visualFacil']);
    $respuestaFacil = trim($_POST['respuestaFacil']);
    $visualMedio = trim($_POST['visualMedio']);
    $respuestaMedio = trim($_POST['respuestaMedio']);
    $visualDificil = trim($_POST['visualDificil']);
    $respuestaDificil = trim($_POST['respuestaDificil']);

    // Verifica si se seleccionó una categoría
    if (isset($_POST['categoria'])) {
        $idcategoria = trim($_POST['categoria']);  // Solo un valor ya que es radio

        $sql = "
        INSERT INTO configuracion 
            (memorizarfacil, ordenarfacil, 
            memorizarmedio, ordenarmedio, 
            memorizardificil, ordenardificil, idcategoria
            ) 
            VALUES 
            (:visualFacil, 
            :respuestaFacil, 
            :visualMedio, 
            :respuestaMedio, 
            :visualDificil, 
            :respuestaDificil, 
            :idcategoria)";
        
        $stmt = $conexion->ejecutar($sql, [
            ':visualFacil' => $visualFacil,
            ':respuestaFacil' => $respuestaFacil,
            ':visualMedio' => $visualMedio,
            ':respuestaMedio' => $respuestaMedio,
            ':visualDificil' => $visualDificil,
            ':respuestaDificil' => $respuestaDificil,
            ':idcategoria' => $idcategoria,
        ]);

        if ($stmt) {
            echo "<script language='JavaScript'>location.assign('../../condigoQR.php')</script>";
        } else {
            echo "<script language='JavaScript'>alert('¡Ups, ha ocurrido un error!');location.assign('../../index.php')</script>";
        }
    } else {
        echo "<script language='JavaScript'>alert('¡Por favor selecciona una categoría!');location.assign('../../index.php')</script>";
    }
}
?>
