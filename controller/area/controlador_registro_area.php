<?php
    require '../../model/model_area.php';
    $MU = new Modelo_Area();//Instaciamos

    $a = ucwords(htmlspecialchars($_POST['a'], ENT_QUOTES, 'UTF-8')); // Recibe el usuario
    
    $consulta = $MU->Registrar_Area($a); // Verifica si el usuario existe
    echo $consulta;
?>