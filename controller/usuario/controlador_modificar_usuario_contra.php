<?php
    require '../../model/model_usuario.php';
    $MU = new Modelo_Usuario();//Instaciamos

    $id = htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8');
    $con = password_hash(htmlspecialchars($_POST['con'], ENT_QUOTES, 'UTF-8'),PASSWORD_DEFAULT,['cost' => 12]); 
   
    $consulta = $MU->Modificar_Usuario_Contra($id, $con); // Verifica si el usuario existe
    echo $consulta;


?>