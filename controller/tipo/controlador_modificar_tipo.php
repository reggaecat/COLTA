<?php
    require '../../model/model_tipo.php';
    $MU = new Modelo_Tipo();//Instaciamos

    $id = ucwords(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8')); // Recibe el usuario
    $tipo = ucwords(htmlspecialchars($_POST['tipo'], ENT_QUOTES, 'UTF-8')); 
    $esta = ucwords(htmlspecialchars($_POST['esta'], ENT_QUOTES, 'UTF-8')); 
    
    $consulta = $MU->Modificar_Tipo($id, $tipo, $esta); // Verifica si el usuario existe
    echo $consulta;
    


?>