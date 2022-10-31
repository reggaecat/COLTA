<?php
    require '../../model/model_tramite_area.php';
    $MU = new Modelo_TramiteArea();//Instaciamos
    //DATOS 
    $iddo = htmlspecialchars($_POST['iddo'],ENT_QUOTES,'UTF-8');
    $orig = ucwords(htmlspecialchars($_POST['orig'],ENT_QUOTES,'UTF-8'));
    $dest = ucwords(htmlspecialchars($_POST['dest'],ENT_QUOTES,'UTF-8'));
    $desc = htmlspecialchars($_POST['desc'],ENT_QUOTES,'UTF-8');
    $idusu = htmlspecialchars($_POST['idusu'],ENT_QUOTES,'UTF-8');
    $tipo = htmlspecialchars($_POST['tipo'],ENT_QUOTES,'UTF-8');
    $nombrearchivo = htmlspecialchars($_POST['nombrearchivo'],ENT_QUOTES,'UTF-8'); 
    $ultimo = htmlspecialchars($_POST['ultimo'],ENT_QUOTES,'UTF-8');
    $arcfi = htmlspecialchars($_POST['arcfi'],ENT_QUOTES,'UTF-8');
     
    if($nombrearchivo !=""){
        $ruta='controller/tramite_area/documentos/'.$nombrearchivo;
    }else{
        $ruta='';
    }

    $consulta = $MU->Registrar_Tramite_derivado($iddo,$orig,$dest,$desc,$idusu,$ruta,$tipo,$ultimo,$arcfi);
    //echo $consulta;
    if($consulta==1){
        if($nombrearchivo!=""){
            if(move_uploaded_file($_FILES['archivoobj']['tmp_name'],"documentos/".$nombrearchivo));
        }
        echo $consulta;
    }
?>