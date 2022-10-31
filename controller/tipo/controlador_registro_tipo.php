<?php
    require '../../model/model_tipo.php';
    $MU = new Modelo_Tipo();//Instaciamos

    $t = ucwords(htmlspecialchars($_POST['t'], ENT_QUOTES, 'UTF-8')); // Recibe el usuario
    
    $consulta = $MU->Registrar_Tipo($t); // Verifica si el usuario existe
    echo $consulta;


?>