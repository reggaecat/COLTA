<?php
    require '../../model/model_usuario.php';
    $MU = new Modelo_Usuario();//Instaciamos

    $id = htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8');
    $usu = htmlspecialchars($_POST['usu'], ENT_QUOTES, 'UTF-8'); 
   
    $consulta = $MU->Modificar_Usuario_Usu($id, $usu); // Verifica si el usuario existe
    echo $consulta;


?>