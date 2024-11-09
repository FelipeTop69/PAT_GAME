<?php

    include '../Conexion 3/conexion.php';
    $conexion = new Conexion();
    $conectar = $conexion->conectar();

    // Consulta para obtener el primer ID de categoría entre los posibles valores (1, 2, 3)
    $sql = $conectar->prepare("SELECT idcategoria FROM configuracion WHERE idcategoria IN (1, 2, 3) LIMIT 1");
    $sql->execute();
    $resultado = $sql->fetch(PDO::FETCH_ASSOC); // Obtenemos una sola fila

    // Verificamos si se encontró una categoría
    if ($resultado) {
        $selectedCategoryId = $resultado['idcategoria'];
    } else {
        $selectedCategoryId = null;
    }

    // Define las URLs para cada categoría
    $links = [
        1 => "../Partida/Categoria_Numeros/Detalles.html",
        2 => "../Partida/Categoria_Frutas/Detalles.html",
        3 => "../Partida/Categoria_computo/Detalles.html"
    ];

    // Asigna la URL basada en la categoría seleccionada, o '#' si no existe
    $selectedLink = $selectedCategoryId ? ($links[$selectedCategoryId] ?? '#') : '#';

    session_start();

    // Verificar si la sesión del jugador está activa
    if (!isset($_SESSION['jugador'])) {
        header("Location: Registro.html");
        exit;
    }

    $jugadorSesion = [
        'id' => $_SESSION['jugador']['numerodocumento'],
        'nombre' => $_SESSION['jugador']['nombre']
    ];

    // session_destroy();


?>

<!-- <!DOCTYPE html> -->
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Icono -->
    <link rel="icon" href="../assets/img/Logos/Logo Principal.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/img/Logos/Logo Secundario.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/img/Logos/Logo Secundario.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/img/Logos/Logo Secundario.png">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="../Bootstrap/css/bootstrap.min.css">
    <!-- Librerias -->
    <link rel="stylesheet" href="../assets/Libreria/SweetAlert2/css/sweetalert2.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <!-- Estilos -->
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/fondoContenido.css">
    <link rel="stylesheet" href="assets/css/stylesLobby.css">

    <!-- Iconos -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css">
    <title>PAT GAME</title>
</head>

<body>
    <div class="container d-flex flex-column vh-100">
        <div class="contenedor-up  d-flex justify-content-between align-items-center">
            <button id="botonSalir" type="button" class="boton-volver">

            </button>
            <button id="botonInformacion" type="button" class="boton-informacion" data-bs-toggle="modal"
                data-bs-target="#modalInformacion">

            </button>
        </div>
        <div class="d-flex flex-grow-1 flex-column align-items-center p-2">
            <div class="marco-titulo-carta p-2">
                <h1 class="titulo-carta m-0">LOBBY</h1>
            </div>
            <div class="carta d-flex flex-column align-items-center">
                <h5 class="text-bienvenida">Bienvenido <?php echo htmlspecialchars($_SESSION['jugador']['nombre']); ?>!</h1>
                    <div class="carta-texto-top  p-2">
                        <h3 class="carta-texto">En Espera</h3>
                        <div class="wrapper">
                            <div class="circle"></div>
                            <div class="circle"></div>
                            <div class="circle"></div>
                            <div class="shadow"></div>
                            <div class="shadow"></div>
                            <div class="shadow"></div>
                        </div>
                    </div>
                    <div id="cartaJugadores" class="carta-jugadores">

                    </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalInformacion" data-bs-backdrop="static" tabindex="-1" aria-labelledby="modalInformacionLabel" aria-hidden="true">

    </div>

    <!-- Boton Redirigir -->
    <button class="next position-absolute bottom-0 end-0"id="goToPageBtn" data-link="<?php echo $selectedLink; ?>">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75">
            </path>
        </svg>
    </button>

    <!-- Boton Actualizar -->
    <button id="botonActualizar" class="btn btn-warning position-absolute bottom-0 m-4">Actualizar Points</button>

    <script src="../Bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="../Bootstrap/js/bootstrap.js"></script>
    <script src="../assets/Libreria/SweetAlert2/js/sweetalert2.min.js"></script>
    <script src="../Partida/assets/js/mainJugadores.js"></script>
    <script src="Registro/js/funcionesLobby.js"></script>
    <script src="assets/js/mainLobby.js"></script>
    <script src="../assets/js/main.js"></script>
    <script src="../Admin/assets/js/boton2.js"></script>

    <script>
        // Pasar el array a JSON
        const jugadorSesion = <?php echo json_encode($jugadorSesion); ?>;
    </script>
</body>

</html>