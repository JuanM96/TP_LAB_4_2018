<?php 
    class vehiculo
    {
        public $id;
        public $marca;
        public $color;
        public $patente;
        public $idChofer;

        function __construct($marca = null,$color = null,$patente = null,$idChofer = null,$id = null)
        {
            if ($marca != null && $color != null &&  $patente != null && $idChofer != null) {
                $this->marca = $marca;
                $this->color = $color;
                $this->patente = $patente;
                $this->idChofer = $idChofer;
            }
            if($id != null){
                $this->id = $id;
            }
        }
        public function Guardar(){
            $itsOk = false;
            $existeVehiculo = $this->VerificarVehiculo();
            if ($existeVehiculo['resultado'] == false) {
                $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
                $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `vehiculo`(`marca`, `color`, `patente`, `idChofer`)VALUES (:marca,:color,:patente,:idChofer)");
                $consulta->bindValue(':marca', $this->marca, PDO::PARAM_STR);
                $consulta->bindValue(':color', $this->color, PDO::PARAM_STR);
                $consulta->bindValue(':patente', $this->patente, PDO::PARAM_STR);
                $consulta->bindValue(':idChofer', $this->idChofer, PDO::PARAM_STR);
                $itsOk = $consulta->execute();
            }
            if ($itsOk) {
                $ret['respuesta'] = "El Vehiculo Se Guardo Exitosamente";
            }
            else {
                $ret['respuesta'] = "ERROR, Vehiculo Ya Existente";
            }
            return $ret;
            
        }
        public static function Modificar($nuevoVehiculo,$patente){
            $itsOk = false;
            $vehiculo = vehiculo::TraerVehiculoPorPatente($patente);
            if ($vehiculo != false) {
                $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
                $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `vehiculo` SET `marca`=:marca,`color`=:color,`patente`=:patente,`idChofer`=:idChofer WHERE patente = :patenteBuscado");
                $consulta->bindValue(':marca', $nuevoVehiculo->marca, PDO::PARAM_STR);
                $consulta->bindValue(':color', $nuevoVehiculo->color, PDO::PARAM_STR);
                $consulta->bindValue(':patente', $nuevoVehiculo->patente, PDO::PARAM_STR);
                $consulta->bindValue(':patenteBuscado', $patente, PDO::PARAM_STR);
                $consulta->bindValue(':idChofer', $nuevoVehiculo->idChofer, PDO::PARAM_STR);
                $itsOk = $consulta->execute();
            }
            if ($itsOk) {
                $ret['respuesta'] = "El Vehiculo Se Modifico Exitosamente";
            }
            else {
                $ret['respuesta'] = "ERROR, Vehiculo Inexistente";
            }
            return $ret;
            
        }
        public static function TraerTodosVehiculos(){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM vehiculo WHERE 1");
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'vehiculo');
        }
        public static function TraerVehiculoPorPatente($patente){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM vehiculo WHERE patente = :patente");
            $consulta->bindValue(':patente', $patente, PDO::PARAM_STR);
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_CLASS, 'vehiculo');
            $UsuarioBuscado= $consulta->fetch();
            return $UsuarioBuscado;
        }
        public static function TraerVehiculoPorIdChofer($idChofer){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM vehiculo WHERE idChofer = :idChofer");
            $consulta->bindValue(':idChofer', $idChofer, PDO::PARAM_STR);
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_CLASS, 'vehiculo');
            $UsuarioBuscado= $consulta->fetch();
            return $UsuarioBuscado;
        }
        public function VerificarVehiculo(){
            $objetoAccesoDatos = AccesoDatos::DameUnObjetoAcceso();
            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM vehiculo WHERE patente = :patente");
            $consulta->bindValue(':patente', $this->patente, PDO::PARAM_STR);
            $consulta->setFetchMode(PDO::FETCH_CLASS, "vehiculo");
            if ($consulta->execute() && $ret['vehiculo'] = $consulta->fetch()) {
                $ret['resultado'] = true;
            }
            else {
                $ret['resultado'] = false;
            }
            return $ret;
        }
        public static function Baja($patente){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM `vehiculo` WHERE patente = :patente");
            $consulta->bindValue(':patente', $patente, PDO::PARAM_BOOL);
            if($consulta->execute()&& $consulta->rowCount() == 0)
            {
                $ret['resultado'] = "Vehiculo Inexistente";
            }
            else{
                $ret['resultado'] = "Borrado con exito!";
            }
            return $ret;
        }
    }
?>