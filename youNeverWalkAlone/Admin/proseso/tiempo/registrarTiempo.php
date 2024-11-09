<?php
include("../../../Conexion 3/conexion.php");
$conn = new Conexion();
$conex = $conn->conectar();

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

        $consulta = "INSERT INTO configuracion 
                    (memorizarfacil, ordenarfacil, memorizarmedio, ordenarmedio, memorizardificil, ordenardificil, idcategoria) 
                    VALUES (:visualFacil, :respuestaFacil, :visualMedio, :respuestaMedio, :visualDificil, :respuestaDificil, :idcategoria)";
        
        $stmt = $conex->prepare($consulta);

        // Bindear los parámetros
        $stmt->bindParam(':visualFacil', $visualFacil);
        $stmt->bindParam(':respuestaFacil', $respuestaFacil);
        $stmt->bindParam(':visualMedio', $visualMedio);
        $stmt->bindParam(':respuestaMedio', $respuestaMedio);
        $stmt->bindParam(':visualDificil', $visualDificil);
        $stmt->bindParam(':respuestaDificil', $respuestaDificil);
        $stmt->bindParam(':idcategoria', $idcategoria);

        if ($stmt->execute()) {
            echo "<script language='JavaScript'>location.assign('../../condigoQR.php')</script>";
        } else {
            echo "<script language='JavaScript'>alert('¡Ups, ha ocurrido un error!');location.assign('../../index.php')</script>";
        }
    } else {
        echo "<script language='JavaScript'>alert('¡Por favor selecciona una categoría!');location.assign('../../index.php')</script>";
    }
}
?>
