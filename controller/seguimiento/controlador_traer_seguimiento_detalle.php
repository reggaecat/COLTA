<?php
    require '../../model/model_seguimiento.php';
    $MU = new Modelo_Seguimiento();//Instaciamos
    $codigo = strtoupper(htmlspecialchars($_POST['codigo'],ENT_QUOTES,'UTF-8')); 
    $consulta = $MU->Traer_Datos_Detalle_Seguimiento($codigo);
    echo json_encode($consulta);

?>