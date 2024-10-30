<?php
session_start();
session_unset();
session_destroy();

// Enviar respuesta en formato JSON
echo json_encode([
    'status' => 'success',
    'message' => 'La sesión se ha cerrado correctamente.'
]);
exit;
?>