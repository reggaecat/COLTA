<?php
   require '../../model/model_seguimiento.php';
   $MU = new Modelo_Seguimiento();//Instaciamos
    $numero = htmlspecialchars($_POST['numero'], ENT_QUOTES, 'UTF-8'); 

    $consulta = $MU->Cargar_Select_Datos_Segimiento($numero);
    
    echo json_encode($consulta);
    

?>