<?php
include '../Conexion/conexion.php';
$conexion = new Conexion;

$sql = "SELECT idcategoria, nombre  FROM categoria WHERE activo=1";
$stmt = $conexion->ejecutar($sql); //espara que se ejecute la base de datos 
$resultado = $stmt->fetchAll();

?>



<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />

    <!-- ICONO DE PAT DEL TITULO-->
    <link rel="icon" href="../assets/img/Logos/Logo Principal.ico" type="image/x-icon">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/img/Logos/Logo Secundario.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/img/Logos/Logo Secundario.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/img/Logos/Logo Secundario.png">
    <title>PAT GAME</title>
    <!-- FIN ICONO DE PAT DEL TITULO-->

    <link href="./css/styles.css" rel="stylesheet" />
    <!--styles de pat-->
    <link rel="stylesheet" href="../Bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/css/styles- Switch.css">
    <link rel="stylesheet" href="./assets/css/styles_new.css">
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>

</head>

<body class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark d-flex">
        <!-- TITULO DE PAT EN LA BARRA SUPERIOR-->
        <a class="navbar-brand ps-3" href="index.html">PAT</a>
        <!-- BOTON DE LA BARRA DESPLEGABLE -->
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>

        <!-- ICONO DE PAT DE LA BARRA -->
        <div class="contenedor-icono ms-auto ms-md-0 d">
            <img class="icono img-fluid" src="../assets/img/Logos/Logo Principal.ico" alt="">
        </div>
        <!-- FIN ICONO DE PAT DE LA BARRA -->
    </nav>
    <div id="layoutSidenav">
        <!-- CONFIGURACION DE LA BARRA DESPEGABLE-->
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">CONFIGURACIÓN</div>
                        <a class="nav-link" href="index.php">
                            <div class="sb-nav-link-icon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA1RJREFUSEu1VU1oXFUU/r73ZkqpkbpQWyrNYEprwEWDK0EwbhQU6h8EFB1y75tkYpeCf10Igwt/caMbO753z2ticCFaRLFLRdt1RBRRsaY2glUr4i9mZt4xdzIJ85sM2L7Ne++ee893zne+cy5xmR9eZv8YCsBaew+B5wGMtwL6MlN9LE3TD7YLcCiAyNofAezpcnbWiRz43wAzxtyWkR96R06kGVBkrfo3g2AySZKPtwLpyaBkzAMaBNNQ/YLALgWOthwsO5HrWwDLAArNdfJVADWqjkM1TdL0rXbADoCSMfcqebIrolUFqgBeFJHz3lYuFkdrudzjBMoAdnQ4VL07SdP3NtY2Acrl8u56rfY1gGsVeC4AxpS8g43GkeTEiTP9aLDWTpI8qaqnAJwjcAzAhX9XVw8tLi7+3kxw42AURfdB9R0AS07kpnaHxpi9ARCDvLm1fkaBGRH5uX1fZO2nAA6zLYtNgFKpdKtm2UceVNfqWSgUZiuVStZ0Ti4B2NuVxXkGwUSSJL9OTU2FV46MvL6WhQWQgZx0zp3uyMD/lKydU+C1VvEOOOfOlqxdUOBhAu8yDD0FyBqNlwHcqcBxEXnEGHMwID29UGBWROKeGmxSZe0/AHaOFgr5SqVSj6z9AcC+Wr2+Z2Fh4aemiqJoDKrfKvC9iBSMMTsD0p/7y4mMDFRRS4JNgFw+v6NardYia1cAXBeE4f44jv13U0X1XO4cgBUnsn9ogHaKgjAci+P4u8gYAWk8RUo+6cGp+qwCd0E1cWk6004RVMsuTX091pne+GhKDvAdSwJvhPn8XLVa/dtaew2Bz718u4q8Um80Jubn5y8Wi8Ur8mF4HORDA4s8Y8z9Gfl2P5lGUbQPqusyVc0InGYYzsVxfKEdtGTtkgITChwRkfc7MjDGXBWQX3U0GnCLAk+IyJsDGu1BAi+B/ARZtgzyKd9oIA865/7olWn/UeH3nQL5qHPOBwBjzDjJVwjc3g3c3mQ9AM1eaBt2IH+B6tNrc2gXgItO5OqW0n4DsBvAnyCf8U041LDrR8Ps9PSNjSDwRe4Z15nqoTRNv+l3bmCjDeDaD7LRLtvm+L4UAP7KfAHADevi5mdZlh27ZFfmVhFuZxvqTt7OyVb2/wC+t2UoWWS00QAAAABJRU5ErkJggg==" /></div>
                            Juego
                        </a>
                        <div class="sb-sidenav-menu-heading">PREPARTIDA</div>
                        <a class="nav-link " href="condigoQR.php">
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
                        <a class="nav-link" href="seguir_partida.html">
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
        <!-- FIN CONFIGURACION DE LA BARRA DESPEGABLE-->

        <!--PAGINA DE CONFIGURACION-->
        <div id="layoutSidenav_content">
            <main>
                <form action="proseso/tiempo/registrarTiempo.php" method="POST">
                    <!-- SELECCION DE CATEGORIA-->
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">CATEGORÍA</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">SELECCIÓN</li>
                        </ol>

                        <div class="row justify-content-evenly">

                            <?php
                            // Ejemplo de redirección a diferentes páginas según el ID de la categoría
                            $link = [
                                1 => "../Partida/Categoria_Numeros/Detalles.html",  // Asigna la página "numero" al ID 1
                                2 => "../Partida/Categoria_Frutas/Detalles.html",     // Asigna la página "frutas" al ID 2
                                3 => "../Partida/Categoria_Computo/Detalles.html" // Asigna la página "computo" al ID 3
                            ];
                            foreach ($resultado as $row) {
                                // Variables dinámicas
                                $id = $row['idcategoria'];
                                $pageUrl = isset($link[$id]) ? $link[$id] : 'default.html';
                                $imagen = "assets/img/" . $id . "/categoria.png";
                            ?>
                                <div class="col-xl-3 col-md-6">
                                    <div class="card" style="width: 18rem;">
                                        <!-- Imagen de la categoría -->
                                        <img src="<?php echo $imagen; ?>" class="card-img-top" alt="Categoría">

                                        <!-- Título de la categoría -->
                                        <div class="card-body">
                                            <h5 class="card-title text-center"><?php echo $row['nombre']; ?></h5>

                                            <!-- Switch para seleccionar categoría -->
                                            <label class="switch">
                                                <input type="checkbox" class="switch-checkbox" name="categoria" value="<?php echo $id; ?>" onclick="setLink('<?php echo $pageUrl; ?>')">
                                                <span class="slider round"></span>
                                            </label>
                                            <!-- <input type="hidden" name="categoriaLink" id="categoriaLink"> -->
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                    </div>

                    <!-- SELECCIÓN DE TIEMPO -->
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">CATEGORÍA</h1>

                        <!-- TIEMPO MODIFICABLE-->
                        <div class="card mb-4">
                            <div class="card-header">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAhpJREFUSEu11UuoT1EUx/HPlTwixcwjlAFFSDFSjOSRhDwGKCVJxEAGrjzCSFJeJQNCiYHkGWUgj5m8InknU0XKI8JetW/9Heec//3fumd0Omft/V17rd/67Tbd/LR18/6aAXpjIWZiAkbiD97hIa7hPH5WJVoHmIUjedO6g77CGtwsC6oC7EiZbs8L3uMsruBR/jYRc7EYw/K3TdhXhJQBOjb/gmW4lMtSlmAPLMJx9MUGHGgMLAIiq4v4ljKenBY/7aQIpuAuAjgNdzrWNQL64wUGYzlOl2weDY6n7OQbsR/PU+PHdzS+MXAtDqe6PsO4irLUAXpldUWC83GhmMlVhHLWZVBZdeoAEb8HW3AMq4uAD+nHUIzCm4raNwNMxW08SL2cVAR8zUoINXxvAqhS4yB8xCcMLAJCltHoAYj3uhJVAWLt57w+3v9RQ3R/dFbAk07KsxgWZbmfhTK2CDiTJLYUm7G3i4Ct2JX6eCr1cUURENo/iZcYg98tQnqm+XmN4ViCc0VANDfKFAErk8mdaBGwPttEDGsM2o+yiZyB612wirCVe9kqpmepVo58O3ZnNYTZXa45SXhPlCMGq1+SaJziUGN8lV1vSwrbmQPfZruOSX+MsISwknnZSYdkWwknPVil37Ik5yTjO5qnu64dceGswq2yoGZXZp+U9QLMzo0bkbMNtYTeb2RT+1WVQTNAi0L6P7zbAX8BMbFmGXS+z2AAAAAASUVORK5CYII=" />
                                TIEMPO CONFIGURADO
                            </div>
                            <div class="container">
                                <div class="periodo col-12 row">
                                    <div class="col-12 row periodo-dividido">
                                        <div class="celda col-4">
                                            <div class="elemento    ">
                                                <div class="nombre p-2 text-center">Nivel</div>
                                                <div class="row g-3 align-items-center">
                                                    <div class="col-row text-center">
                                                        <label for="inputPassword6" class="col-form-label " style="color: green; ">Facil</label>
                                                    </div>
                                                    <div class="col-row text-center">
                                                        <label for="inputPassword6" class="col-form-label" style="color: rgb(209, 209, 18)">Medio</label>
                                                    </div>
                                                    <div class="col-row text-center">
                                                        <label for="inputPassword6" class="col-form-label" style="color:red ">Dificil</label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="celda col-4">
                                            <div class="elemento">
                                                <div class="nombre p-2 text-center">Visualización</div>
                                                <div class="row g-3 align-items-center">
                                                    <div class="col-auto mx-auto">
                                                        <input type="number" name="visualFacil" id="visualFacil" class="form-control w-50 mx-auto" aria-describedby="passwordHelpInline">
                                                    </div>
                                                    <div class="col-auto mx-auto">
                                                        <input type="number" name="visualMedio" id="visualMedio" class="form-control w-50 mx-auto" aria-describedby="passwordHelpInline">
                                                    </div>
                                                    <div class="col-auto mx-auto mb-2">
                                                        <input type="number" name="visualDificil" id="visualDificil" class="form-control w-50 mx-auto" aria-describedby="passwordHelpInline">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="celda col-4">
                                            <div class="elemento">
                                                <div class="nombre p-2 text-center">Respuesta</div>
                                                <div class="row g-3 align-items-center">
                                                    <div class="col-auto mx-auto">
                                                        <input type="number" name="respuestaFacil" id="respuestaFacil" class="form-control w-50 mx-auto" aria-describedby="passwordHelpInline">
                                                    </div>
                                                    <div class="col-auto mx-auto">
                                                        <input type="number" name="respuestaMedio" id="respuestaMedio" class="form-control w-50 mx-auto" aria-describedby="passwordHelpInline">
                                                    </div>
                                                    <div class="col-auto mx-auto mb-2">
                                                        <input type="number" name="respuestaDificil" id="respuestaDificil" class="form-control w-50 mx-auto" aria-describedby="passwordHelpInline">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- FIN TIEMPO MODIFICABLE-->
                    </div>

                    <!--BOTON DE COMENZAR PARTIDA -->
                    <div class="d-grid gap-2 col-4 mx-auto mb-4">
                        <button id="goToPageBtn" name="register" class="btn btn-outline-success" type="submit">Comenzar Partida</button>
                    </div>
                    <!--FIN BOTON DE COMENZAR PARTIDA -->

                </form>
            </main>
            <br>

            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; Your Website 2023</div>
                    </div>
                </div>
            </footer>
        </div>
        <!--FIN PAGINA DE CONFIGURACION-->
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="js/scripts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
    <script src="assets/demo/chart-area-demo.js"></script>
    <script src="assets/demo/chart-bar-demo.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js" crossorigin="anonymous"></script>
    <script src="js/datatables-simple-demo.js"></script>
    <script src="./Bootstrap/js/bootstrap.js"></script>
    <!-- <script src="assets/js/switch/categoria.js"></script>  -->
    <!-- <script src="assets/js/switch1.js"></script> -->
    <script src="assets/js/link.js"></script>

</body>

</html>