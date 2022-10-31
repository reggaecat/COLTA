<?php
    require '../../model/model_tramite_area.php';
    $MU = new Modelo_TramiteArea();//Instaciamos

    $f = htmlspecialchars($_POST['f'], ENT_QUOTES, 'UTF-8'); // Recibe el usuario
    $id = htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'); 
    $res = htmlspecialchars($_POST['res'], ENT_QUOTES, 'UTF-8'); 
    
    $consulta = $MU->Registrar_Fecha($f, $id,$res); // Verifica si el usuario existe
    echo $consulta;
?> 