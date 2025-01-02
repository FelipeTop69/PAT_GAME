<?php
include '../Conexion/conexion.php';
$conexion = new Conexion();

// Consulta para obtener el primer ID de categoría entre los posibles valores (1, 2, 3)
$sql = "SELECT idcategoria FROM configuracion WHERE idcategoria IN (1, 2, 3) LIMIT 1";
$stmt = $conexion->ejecutar($sql);
$resultado = $stmt->fetch(); // Obtenemos una sola fila

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
    3 => "../Partida/Categoria_Computo/Detalles.html"
];

// Asigna la URL basada en la categoría seleccionada, o '#' si no existe
$selectedLink = $selectedCategoryId ? ($links[$selectedCategoryId] ?? '#') : '#';

// echo "<p>Enlace seleccionado: $selectedLink</p>"; // Mensaje de depuración
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Ingreso a Partida</title>

    <link rel="icon" href="../assets/img/Logos/Logo Principal.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/img/Logos/Logo Secundario.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/img/Logos/Logo Secundario.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/img/Logos/Logo Secundario.png">

    <link rel="stylesheet" href="../Bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/css/stylesQR.css">
    <link rel="stylesheet" href="assets/css/stylesPlantilla.css">
    <link rel="stylesheet" href="../assets/Libreria/SweetAlert2/css/sweetalert2.min.css">
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
</head>

<body class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark d-flex">
        <!-- TITULO DE PAT EN LA BARRA SUPERIOR-->
        <a class="navbar-brand ps-3" href="Configuracion_Partida.php">PAT</a>
        <!-- BOTON DE LA BARRA DESPLEGABLE -->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>

        <!-- ICONO DE PAT DE LA BARRA -->
        <div class="contenedor-icono-navbar ms-auto ms-md-0 d">
            <img class="icono-navbar" src="../assets/img/Logos/Logo Principal.ico" alt="">
        </div>
        <!-- FIN ICONO DE PAT DE LA BARRA -->
    </nav>
    </nav>
    <!-- CONFIGURACION DE LA BARRA DESPEGABLE-->
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">CONFIGURACION</div>
                        <a class="nav-link" href="Configuracion_Partida.php">
                            <div class="sb-nav-link-icon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA1RJREFUSEu1VU1oXFUU/r73ZkqpkbpQWyrNYEprwEWDK0EwbhQU6h8EFB1y75tkYpeCf10Igwt/caMbO753z2ticCFaRLFLRdt1RBRRsaY2glUr4i9mZt4xdzIJ85sM2L7Ne++ee893zne+cy5xmR9eZv8YCsBaew+B5wGMtwL6MlN9LE3TD7YLcCiAyNofAezpcnbWiRz43wAzxtyWkR96R06kGVBkrfo3g2AySZKPtwLpyaBkzAMaBNNQ/YLALgWOthwsO5HrWwDLAArNdfJVADWqjkM1TdL0rXbADoCSMfcqebIrolUFqgBeFJHz3lYuFkdrudzjBMoAdnQ4VL07SdP3NtY2Acrl8u56rfY1gGsVeC4AxpS8g43GkeTEiTP9aLDWTpI8qaqnAJwjcAzAhX9XVw8tLi7+3kxw42AURfdB9R0AS07kpnaHxpi9ARCDvLm1fkaBGRH5uX1fZO2nAA6zLYtNgFKpdKtm2UceVNfqWSgUZiuVStZ0Ti4B2NuVxXkGwUSSJL9OTU2FV46MvL6WhQWQgZx0zp3uyMD/lKydU+C1VvEOOOfOlqxdUOBhAu8yDD0FyBqNlwHcqcBxEXnEGHMwID29UGBWROKeGmxSZe0/AHaOFgr5SqVSj6z9AcC+Wr2+Z2Fh4aemiqJoDKrfKvC9iBSMMTsD0p/7y4mMDFRRS4JNgFw+v6NardYia1cAXBeE4f44jv13U0X1XO4cgBUnsn9ogHaKgjAci+P4u8gYAWk8RUo+6cGp+qwCd0E1cWk6004RVMsuTX091pne+GhKDvAdSwJvhPn8XLVa/dtaew2Bz718u4q8Um80Jubn5y8Wi8Ur8mF4HORDA4s8Y8z9Gfl2P5lGUbQPqusyVc0InGYYzsVxfKEdtGTtkgITChwRkfc7MjDGXBWQX3U0GnCLAk+IyJsDGu1BAi+B/ARZtgzyKd9oIA865/7olWn/UeH3nQL5qHPOBwBjzDjJVwjc3g3c3mQ9AM1eaBt2IH+B6tNrc2gXgItO5OqW0n4DsBvAnyCf8U041LDrR8Ps9PSNjSDwRe4Z15nqoTRNv+l3bmCjDeDaD7LRLtvm+L4UAP7KfAHADevi5mdZlh27ZFfmVhFuZxvqTt7OyVb2/wC+t2UoWWS00QAAAABJRU5ErkJggg==" /></div>
                            Juego
                        </a>
                        <div class="sb-sidenav-menu-heading">PREPARTIDA</div>
                        <a class="nav-link " href="Union_Jugadores.php">
                            <div class="sb-nav-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-qrcode">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                    <path d="M7 17l0 .01" />
                                    <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                    <path d="M7 7l0 .01" />
                                    <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                    <path d="M17 7l0 .01" />
                                    <path d="M14 14l3 0" />
                                    <path d="M20 14l0 .01" />
                                    <path d="M14 14l0 3" />
                                    <path d="M14 20l3 0" />
                                    <path d="M17 17l3 0" />
                                    <path d="M20 17l0 3" />
                                </svg></div>
                            QR Partida
                        </a>
                        <div class="sb-sidenav-menu-heading">SEGUIMIENTO PARTIDA</div>
                        <a class="nav-link" href="Seguimiento_Partida.html">
                            <div class="sb-nav-link-icon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAqxJREFUSEvVlU9oXFUUh7+TvIEiWQiRBNEGhKBuBLtqKQouQkRIs2wQkvjunWcCxuCmxG6U6NISF4YovHTueSYIha4kXRQlguBCXYkKhXYRJgtriQZEpTS+mWNfzKTiTDIToaBndXmcc777O3/uE+6zyX3Oz38X4L0/DyyFEH49rAqHKvBxPIvIDDAAVA0WVPWic25EYE3gm508f2Z1dfX3gyAHApxzbwq81RQoMjcwMLBQrVaDwEuIvB9CKC7R0loCvPdPYHYN+AORiSiKPqvt7AybyIdA3WAwz/PtUhRtAj1RqdSXpukvrQitAXH8MiIpkAbV6Uag934FswkDr6rqnVsDRsRstJJlxblZcKuPzrlEYBmzSsiyZB/gXLjbC4dIEkKoeOc+BYYMzqjqlY4B5XJ50Or160WJxGyc7u51M3sBswwwRJ4EtjDbAHrrZo9nWXajY0Dh6L1/A7O3/xlk8LqqvuO9fw+zWeCroHrqSE3+W81n9pLsjqmYXahkWSg796rB4p7fbwZzqvrBkRQctjyTk5OPRF1dY4icBU4WvgaXVXXsr+M9a5qiOI6PdcO0wWuIPNYEMtsQkXcf6OlZXlxcvOO9n9zrjSByLoSwcCDAOXdc4BOgaGI7+z4qlYbTNL3pnBsXWAVu57Xa8ZWVlZ8bwfsK5ufno81q9WvgBPCDwXSpVPoyTdOfGs5TU1MP5Xl+GrNiR/qBz4Pqc7tD4dxV4PnGEDQBynH8ioksAbfqZk9nWfbjQRKSJHm0Xqt9BzwoZi9WsuyS934Us4/v7sUXQfXZJoB37lvgKUTGQwgftauPb2y7yHoIYShJkv56rVZcaiuo9rUC3AaO1c0ePuz2jcC9fhVv0XZQ7W27B9653fEKqh3/hDqJ6ThZu5K1VfBvE7SL+/8r+BNPTRkobNM5EQAAAABJRU5ErkJggg==" /></i></div>
                            Jugadores
                        </a>
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">PAT</div>
                    SOLO ADMINISTRADOR
                </div>
            </nav>
        </div>
        <!--Ingreso a la partida con codigo QR y control de ingreso-->
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4 py-2">
                    <!--Mostrar codigo QR-->
                    <div class="row min-vh-100">
                        <!-- Sección izquierda: Título y código QR -->
                        <div class="col-md-6 d-flex flex-column align-items-center justify-content-center posicion-qr">
                            <div class="text-center">
                                <h1 class="textQR">Escanea y Regístrate</h1>
                                <h6 class="textQR color-text">¡Escanea el código QR para ingresar a la partida!</h6>
                                <div class="qr d-flex justify-content-center">
                                    <a href="../PrePartida/comienzo.html" class="tex">
                                        <div id="codigoQR" class="cartaQr">
                                            <!-- <img type="button" src="./assets/img/Qr-temporal-PAT.svg" class="tamanoQr" alt="Código QR"> -->
                                        </div>
                                        <h2 class="qr-text ">¡Escanéame!</h2>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- Sección derecha: Tabla de usuarios con título -->
                        <div class="col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <h1 class="textQR">Jugadores en Lobby</h1>
                            <div id="cantidadJugadores" class="d-flex justify-content-center align-items-center mt-2 mb-2 p-1">
                                <div class="contador-container">
                                    <span id="textContador" class="texto-contador">
                                        0 de 0
                                    </span>
                                </div>
                            </div>
                            <div class="table-container">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">N.O</th>
                                            <th scope="col">Jugador</th>
                                            <th scope="col">Avatar</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tablaLobby">
                                        <!-- <tr>
                                            <th>1</th>
                                            <td>Fabian</td>
                                            <td><img class="img-fluid avatar" src="../PrePartida/assets/img/Recursos/Avatar Limpio.png" alt="avatar"></td>
                                        </tr> -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-12 d-flex justify-content-center align-items-center mt-4">
                            <button id="btnIniciarPartida" type="button" class="boton-carta">
                                <span class="texto-boton">INICIAR PARTIDA</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <script defer src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
            <script defer src="assets/js/mainQR.js"></script>
            <script src="../Bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="../Bootstrap/js/bootstrap.js"></script>
            <script src="assets/js/scriptPlantilla.js"></script>
            <script src="assets/js/estadoPartida.js"></script>
            <script src="Tabla Jugadores/listarJugadores.js"></script>
            <script src="../assets/Libreria/SweetAlert2/js/sweetalert2.min.js"></script>
</body>
</html>