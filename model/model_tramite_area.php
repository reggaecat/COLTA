<?php
    require_once 'model_conexion.php';

    class Modelo_TramiteArea extends conexionBD{
       
        public function Listar_Tramite($idusuario){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_TRAMITE_AREA(?)";
            $arreglo = array();
            $query = $c->prepare($sql);

            $query->bindParam(1, $idusuario);

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
        public function Registrar_Tramite_derivado($iddo,$orig,$dest,$desc,$idusu,$ruta,$tipo,$ultimo,$arcfi){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_TRAMITE_DERIVAR(?, ?, ?, ?, ?, ?, ?, ?,?)";
            $arreglo = array();
            $query = $c->prepare($sql);
    
            $query->bindParam(1, $iddo);
            $query->bindParam(2, $orig);
            $query->bindParam(3, $dest);
            $query->bindParam(4, $desc);
            $query->bindParam(5, $idusu);
            $query->bindParam(6, $ruta);
            $query->bindParam(7, $tipo);
            $query->bindParam(8, $ultimo);
            $query->bindParam(9, $arcfi);

            $resul = $query->execute();
            if($resul){
                return 1;
            }else{
                return 0;
            }
            conexionBD::cerrar_conexion();
        }
        //// listar mis tramites 
        public function Listar_MiTramite($idusuario){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_MITRAMITE_AREA(?)";
            $arreglo = array();
            $query = $c->prepare($sql);

            $query->bindParam(1, $idusuario);

            $query->execute();


            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);
            foreach($resultado as $resp){
                $arreglo["data"][]= $resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();

        }
         

        public function Registrar_Fecha($f, $id,$res){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_FECHAR(?,?,?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query->bindParam(1, $f);
            $query->bindParam(2, $id);
            $query->bindParam(3, $res);
            $query->execute();
            if($row = $query->fetchColumn()){
                return $row;
            }
            conexionBD::cerrar_conexion();
        }
        
    }
?>