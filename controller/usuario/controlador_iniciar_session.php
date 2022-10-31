<?php
    require '../../model/model_usuario.php';

    $MU = new Modelo_Usuario(); // Instancia del modelo de usuario
    $usu = htmlspecialchars($_POST['u'], ENT_QUOTES, 'UTF-8'); // Recibe el usuario
    $con = htmlspecialchars($_POST['c'], ENT_QUOTES, 'UTF-8'); // Recibe la contraseña
    
    $consulta = $MU->Verificar_Usuario($usu, $con); // Verifica si el usuario existe
    if(count($consulta)>0){
        echo json_encode($consulta);
    }else{
        echo 0;
    }
    

?>