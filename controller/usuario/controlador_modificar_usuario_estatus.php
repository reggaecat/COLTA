<?php
    require '../../model/model_usuario.php';
    $MU = new Modelo_Usuario();//Instaciamos

    $id = htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'], ENT_QUOTES, 'UTF-8');
    $consulta = $MU->Modificar_Usuario_Estatus($id, $estatus); // Verifica si el usuario existe
    echo $consulta;


?>



