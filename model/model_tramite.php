<?php
    require_once 'model_conexion.php';

    class Modelo_Tramite extends conexionBD{
        public function Listar_Tramite(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_TRAMITE()";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query->execute();
            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
            foreach($resultado as $resp){
                $arreglo["data"][]= $resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();

        }
        //////////////// LISTAR TRAMITE SEGIMIENTO
        public function Listar_Tramite_segimiento($id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_TRAMITE_SEGUIMIENTO(?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query->bindParam(1, $id);
            $query->execute();

            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
            foreach($resultado as $resp){
                $arreglo["data"][]= $resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }
        ////////////////////////////lista usuario para el relleno
        public function Listar_Tramite_usuario($id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_TRAMITE_USUARIO(?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query->bindParam(1, $id);
            $query->execute();

            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
            foreach($resultado as $resp){
                $arreglo["data"][]= $resp;
                
            }
            return $arreglo;
           //echo "<script> alert($arreglo); </script>";
            conexionBD::cerrar_conexion();
        }
        //////////////////////

        public function Registrar_Tramite($arp,$ard,$tip,$ndo,$asu,$ruta,$fol,$idusu,$tiptra,$arcfi){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_TRAMITE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            
            $query->bindParam(1, $arp);
            $query->bindParam(2, $ard);
            $query->bindParam(3, $tip);
            $query->bindParam(4, $ndo);
            $query->bindParam(5, $asu);
            $query->bindParam(6, $ruta);
            $query->bindParam(7, $fol);
            $query->bindParam(8, $idusu);
            $query->bindParam(9, $tiptra);
            $query->bindParam(10, $arcfi);
            
            $query->execute();
            if($row = $query->fetchColumn()){
                return $row;
            }
            conexionBD::cerrar_conexion();
        }
///////////////////////////////////////////////////////////////////////
        public function Cargar_Select_Tipo(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_CARGAR_SELECT_TIPO()";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query->execute();


            $resultado = $query->fetchAll();
            foreach($resultado as $resp){
                $arreglo[]= $resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();

        }

        public function Cargar_Select_usuario(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_CARGAR_SELECT_USUARIO()";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query->execute();

            $resultado = $query->fetchAll();
            foreach($resultado as $resp){
                $arreglo[]= $resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();

        } 
        //////====cargar ultima fecha 
        public function Cargar_ultima_fecha($id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_CARGAR_FECHA(?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query->bindParam(1, $id);
            $query->execute();

            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
            foreach($resultado as $resp){
                $arreglo["data"][]= $resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        } 

    }
?>