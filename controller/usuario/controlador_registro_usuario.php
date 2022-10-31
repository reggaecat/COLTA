<?php
    require '../../model/model_usuario.php';
    $MU = new Modelo_Usuario();//Instaciamos

    $usu = htmlspecialchars($_POST['usu'], ENT_QUOTES, 'UTF-8'); // Recibe 
    $con = password_hash(htmlspecialchars($_POST['con'], ENT_QUOTES, 'UTF-8'),PASSWORD_DEFAULT,['cost' => 12]);
    //$ide = ucwords(htmlspecialchars($_POST['ide'], ENT_QUOTES, 'UTF-8'));
    $ida = ucwords(htmlspecialchars($_POST['ida'], ENT_QUOTES, 'UTF-8'));
    $rol = strtoupper(htmlspecialchars($_POST['rol'], ENT_QUOTES, 'UTF-8'));
    // DATOS DEL TRABAJADOR 
    $nro = htmlspecialchars($_POST['nro'], ENT_QUOTES, 'UTF-8'); // Recibe 
    $nom = ucwords(htmlspecialchars($_POST['nom'], ENT_QUOTES, 'UTF-8'));
    $apepa = ucwords(htmlspecialchars($_POST['apepa'], ENT_QUOTES, 'UTF-8'));
    $apema = ucwords(htmlspecialchars($_POST['apema'], ENT_QUOTES, 'UTF-8'));
    $movil = htmlspecialchars($_POST['movil'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
    $dire = htmlspecialchars($_POST['dire'], ENT_QUOTES, 'UTF-8');
    


    $consulta = $MU->Registrar_Usuario($usu, $con,$ida, $rol,$nro, $nom, $apepa, $apema, $movil, $email, $dire); // Verifica si el usuario existe
    echo $consulta;


?>