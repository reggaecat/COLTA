<?php
    require_once 'model_conexion.php';

    class Modelo_Usuario extends conexionBD{
       
        public function Verificar_Usuario($usu, $con){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_VERIFICAR_USUARIO(?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            $query->bindParam(1, $usu);
            $query->execute();

            $resultado = $query->fetchAll();
            foreach($resultado as $resp){
                if(password_verify($con, $resp['usu_contra'])){
                    $arreglo[] = $resp;
                }
                
            }
            return $arreglo;
            conexionBD::cerrar_conexion();

        }

        public function Listar_Usuario(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_USUARIO()";
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

        public function Registrar_Usuario($usu, $con,$ida, $rol,$nro, $nom, $apepa, $apema, $movil, $email, $dire){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_REGISTRAR_USUARIO(?, ?, ?, ?, ?,?,?,?,?,?,?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            
            $query->bindParam(1, $usu);
            $query->bindParam(2, $con);
            $query->bindParam(3, $ida);
            $query->bindParam(4, $rol);
            $query->bindParam(5, $nro);
            $query->bindParam(6, $nom);
            $query->bindParam(7, $apepa);
            $query->bindParam(8, $apema);
            $query->bindParam(9, $movil);
            $query->bindParam(10, $email);
            $query->bindParam(11, $dire);

            $query->execute();
            if($row = $query->fetchColumn()){
                return $row;
            }
            conexionBD::cerrar_conexion();

        }

        public function Modificar_Usuario($id, $usu, $ida, $rol,$nro,$nom,$apepa,$apema,$movil,$email,$dire){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_USUARIO(?, ?, ?, ?,?,?,?,?,?,?,?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            
            $query->bindParam(1, $id);
            $query->bindParam(2, $usu);
            $query->bindParam(3, $ida);
            $query->bindParam(4, $rol);
            $query -> bindParam(5,$nro);
            $query -> bindParam(6,$nom);
            $query -> bindParam(7,$apepa);
            $query -> bindParam(8,$apema);
            $query -> bindParam(9,$movil);
            $query -> bindParam(10,$email);
            $query -> bindParam(11,$dire);
            $query->execute();
            if($row = $query->fetchColumn()){
                return $row;
            }
            conexionBD::cerrar_conexion();
            /*
            $resul=$query->execute();

            if($resul){
                return 1;
            }else{
                return 0;
            }
            conexionBD::cerrar_conexion();*/

        }

        public function Modificar_Usuario_Contra($id, $con){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_USUARIO_CONTRA(?, ?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            
            $query->bindParam(1, $id);
            $query->bindParam(2, $con);
            
            $resul=$query->execute();
            if($resul){
                return 1;
            }else{
                return 0;
            }
            conexionBD::cerrar_conexion();

        }

        public function Modificar_Usuario_Estatus($id,$estatus){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_USUARIO_ESTATUS(?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$estatus);
            $resul = $query->execute();
            if($resul){
                return 1;
            }else{
                return 0;
            }
            conexionBD::cerrar_conexion();
        }  

        public function Cargar_Select_Area(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_CARGAR_SELECT_AREA()";
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
        ///////////////////////////////////////
        public function Listar_datos_usuario($id){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_LISTAR_DATOS_USUARIO(?)";
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
        ////==============CARGAR USUARIOS CON DOCUMENTOS
        public function Cargar_Select_UsuDoc(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_CARGAR_SELECT_USUDOC()";
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
        ////==========para el contador 
        public function Traer_Widget(){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_TRAER_WIDGET()";
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
        ///========canbiar solo el usuario 
        public function Modificar_Usuario_Usu($id, $usu){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_USUARIO_USU(?, ?)";
            $arreglo = array();
            $query = $c->prepare($sql);
            
            $query->bindParam(1, $id);
            $query->bindParam(2, $usu);
            
            $resul=$query->execute();
            if($resul){
                return 1;
            }else{
                return 0;
            }
            conexionBD::cerrar_conexion();

        }
        public function Modificar_Datos_Usu($id,$movil,$email,$dir,$ruta){
            $c = conexionBD::conexionPDO();
            $sql = "CALL SP_MODIFICAR_DATOS_USUARIO(?,?,?,?,?)";
            $arreglo = array();
            $query  = $c->prepare($sql);
            
            $query -> bindParam(1,$id);
            $query -> bindParam(2,$movil);
            $query -> bindParam(3,$email);
            $query -> bindParam(4,$dir);
            $query -> bindParam(5,$ruta);

            $query->execute();
            if($row = $query->fetchColumn()){
                return $row;
            }
            conexionBD::cerrar_conexion();

        }

        
    }
?>