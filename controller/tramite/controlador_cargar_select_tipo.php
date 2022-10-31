<?php
      require '../../model/model_tramite.php';
      $MU = new Modelo_Tramite();//Instaciamos
    $consulta = $MU->Cargar_Select_Tipo();
    
    echo json_encode($consulta);
    

?>