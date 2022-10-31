<?php
    require '../../model/model_usuario.php';

    $MU = new Modelo_Usuario(); // Instancia del modelo de usuario
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $consulta = $MU->Listar_datos_usuario($id);
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData": []
        }';
    }  
    

?>