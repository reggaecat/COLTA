<?php
    require '../../model/model_area.php';
    $MU = new Modelo_Area();//Instaciamos

    $id = htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'); // Recibe el usuario
    $are = ucwords(htmlspecialchars($_POST['are'], ENT_QUOTES, 'UTF-8')); 
    $esta = strtoupper(htmlspecialchars($_POST['esta'], ENT_QUOTES, 'UTF-8')); 
    
    $consulta = $MU->Modificar_Area($id, $are, $esta); // Verifica si el usuario existe
    echo $consulta;


?>