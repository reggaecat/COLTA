<?php
    require_once 'model_conexion.php';

    class Modelo_Seguimiento extends conexionBD{
        ////==============CARGAR USUARIOS CON DOCUMENTOS
        public function Cargar_Select_NumDoc(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_CARGAR_SELECT_NUMDOC()";
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
                ///=============
        public function Cargar_Select_Datos_Segimiento($numero){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_CARGAR_SEGUIMIENTO_TRAMITE_INTERNO(?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query -> bindParam(1,$numero);
            $query->execute();

            $resultado = $query->fetchAll();
            foreach($resultado as $resp){
                $arreglo[]= $resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();

        }
        //========== Datos del detalle del seguimiento 
        public function Traer_Datos_Detalle_Seguimiento($codigo){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_CARGAR_SEGUIMIENTO_TRAMITE_DETALLE_INTERNO(?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$codigo);
            $query->execute();
            $resultado = $query->fetchAll();
            foreach($resultado as $resp){
                $arreglo[]=$resp;
            }
            return $arreglo;
            conexionBD::cerrar_conexion();
        }

    }
    

?>