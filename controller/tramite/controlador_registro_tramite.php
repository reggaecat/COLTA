<?php
    require '../../model/model_tramite.php';
    $MU = new Modelo_Tramite();//Instaciamos
    //DATOS DEL DOCUMENTO 
    $arp = htmlspecialchars($_POST['arp'],ENT_QUOTES,'UTF-8');
    $ard = htmlspecialchars($_POST['ard'],ENT_QUOTES,'UTF-8');
    $tip = htmlspecialchars($_POST['tip'],ENT_QUOTES,'UTF-8');
    $ndo = ucwords(htmlspecialchars($_POST['ndo'],ENT_QUOTES,'UTF-8'));
    $asu = htmlspecialchars($_POST['asu'],ENT_QUOTES,'UTF-8');
    $nombrearchivo = htmlspecialchars($_POST['nombrearchivo'],ENT_QUOTES,'UTF-8');
    $fol = ucwords(htmlspecialchars($_POST['fol'],ENT_QUOTES,'UTF-8'));
    $idusu = htmlspecialchars($_POST['idusu'],ENT_QUOTES,'UTF-8');

    $tiptra = htmlspecialchars($_POST['tiptra'],ENT_QUOTES,'UTF-8');
    $arcfi = htmlspecialchars($_POST['arcfi'],ENT_QUOTES,'UTF-8');

    if($nombrearchivo !=""){
        $ruta='controller/tramite/documentos/'.$nombrearchivo;
    }else{
        $ruta='';
    }

    $consulta = $MU->Registrar_Tramite($arp,$ard,$tip,$ndo,$asu,$ruta,$fol,$idusu,$tiptra,$arcfi);
    echo $consulta;
    
    if($nombrearchivo!=""){
     if(move_uploaded_file($_FILES['archivoobj']['tmp_name'],"documentos/".$nombrearchivo));
    }
?>