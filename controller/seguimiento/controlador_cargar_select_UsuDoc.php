<?php
    require '../../model/model_seguimiento.php';
    $MU = new Modelo_Seguimiento();//Instaciamos
    $consulta = $MU->Cargar_Select_NumDoc();
    
    echo json_encode($consulta); 

?>