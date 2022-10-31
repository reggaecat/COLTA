<?php
    require '../../model/model_usuario.php';
    $MU = new Modelo_Usuario();//Instaciamos

    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $movil = htmlspecialchars($_POST['movil'],ENT_QUOTES,'UTF-8');
    $email = htmlspecialchars($_POST['email'],ENT_QUOTES,'UTF-8');
    $dir = htmlspecialchars($_POST['dir'],ENT_QUOTES,'UTF-8');
    $nombrearchivo = htmlspecialchars($_POST['nombrearchivo'],ENT_QUOTES,'UTF-8');

        
    if($nombrearchivo !=""){
        $ruta='controller/usuario/FOTO/'.$nombrearchivo;
    }else{
        $ruta='';
    }

    $consulta = $MU->Modificar_Datos_Usu($id,$movil,$email,$dir,$ruta);
    echo $consulta;
    
    if($nombrearchivo!=""){
     if(move_uploaded_file($_FILES['archivoobj']['tmp_name'],"FOTO/".$nombrearchivo));
    }
    


?>