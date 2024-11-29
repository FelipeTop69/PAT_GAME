<?php
include '../../Conexion/conexion.php';
$conexion = new Conexion();

// Consulta para obtener el primer ID de categoría entre los posibles valores (1, 2, 3)
$sql = "SELECT idcategoria FROM configuracion WHERE idcategoria IN (1, 2, 3) LIMIT 1";
$stmt = $conexion->ejecutar($sql);
$resultado = $stmt->fetch(); // Obtenemos una sola fila

// Verificamos si se encontró una categoría
if ($resultado) {
    $selectedCategoryId = $resultado['idcategoria'];
    // echo "<p>Categoría seleccionada: $selectedCategoryId</p>"; // Mensaje de depuración
} else {
    $selectedCategoryId = null;
    // echo "<p>No se encontró ninguna categoría en la base de datos.</p>"; // Mensaje de depuración
}

// Define las URLs para cada categoría
$links = [
    1 => "../Categoria_Numeros/",
    2 => "../Categoria_Frutas/",
    3 => "../Categoria_computo/"
];

// Asigna la URL basada en la categoría seleccionada, agregando el archivo "Memorizacion.html"
$selectedLink = $selectedCategoryId ? ($links[$selectedCategoryId] . "Memorizacion Dificil.html") : '#';
?>

<!-- <!DOCTYPE html> -->
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Icono -->
    <link rel="icon" href="../../assets/img/Logos/Logo Principal.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="../../assets/img/Logos/Logo Secundario.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../../assets/img/Logos/Logo Secundario.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../../assets/img/Logos/Logo Secundario.png">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="../../Bootstrap/css/bootstrap.min.css">
    <!-- Librerias -->
    <link rel="stylesheet" href="../../assets/Libreria/SweetAlert2/css/sweetalert2.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <!-- Estilos -->
    <link rel="stylesheet" href="../../assets/css/style.css">
    <link rel="stylesheet" href="../../assets/css/fondoContenido.css">
    <link rel="stylesheet" href="../assets/css/stylesDificultad.css">

    <!-- Iconos -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css">
    <title>PAT GAME</title>
</head>

<body>

    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="carta-dificultad p-3 animate__animated animate__zoomInUp">
            <div class="titulo-dificultad position-absolute top-0 start-50 translate-middle">
                <div class="marco-titulo px-2 py-3 ">
                    <h1 class="shake">¡ATENTO!!!</h1>
                </div>
            </div>
            <div class="contenido-dificultad">
                <div class="contenedor-titulo texto-dificil p-2">
                    <h4>DIFICULTAD</h4>
                </div>
                <div class="contenedor-dificultad p-2">
                    <div class="marco-imagen-dificultad dificultad-dificil p-1">
                        <img class="img-fluid" src="../../assets/img/Recursos/Dificultad Dificil.png" alt="imagenDificultad">
                    </div>
                </div>
                <div class="contenedor-descripcion p-2">
                    <div class="contenedor-numero-elementos p-1">
                        <h4 class="palabra texto-dificil">ELEMENTOS</h4>
                        <h4 class="numero">8</h4>
                    </div>
                    <div class="contenedor-tiempo p-1">
                        <h4 class="palabra texto-dificil">TIEMPO MEMORIZACION</h4>
                        <h4 id="tiempoMemoDificil" class="numero"></h4>
                    </div>
                </div>
            </div>
        </div>
        <!-- <a href="<?php echo htmlspecialchars($selectedLink); ?>">
            <button  class="next position-absolute bottom-0 end-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75">
                    </path>
                </svg>
            </button>
        </a> -->
    </div>
    <script src="../../Bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../../Bootstrap/js/bootstrap.js"></script>
    <script src="../../assets/Libreria/SweetAlert2/js/sweetalert2.min.js"></script>
    <script src="../assets/js/mainDificultad.js"></script>
    <script src="../../Admin/assets/js/boton2.js"></script>
    <script src="../../assets/js/main.js"></script>
    <script>

        document.addEventListener('DOMContentLoaded', () =>{

            setTimeout(() => {
                window.location.href = "<?php echo htmlspecialchars($selectedLink); ?>";
            }, 4000); 

        })

    </script>
</body>
</html>