<?php 
    class vehiculo
    {
        public $id;
        public $marca;
        public $color;
        public $patente;
        public $habilitado;
        //public $idChofer;

        function __construct($marca = null,$color = null,$patente = null/*,$idChofer = null*/,$habilitado = null,$id = null)
        {
            if ($marca != null && $color != null &&  $patente != null /*&& $idChofer != null*/) {
                $this->marca = $marca;
                $this->color = $color;
                $this->patente = $patente;
                //$this->idChofer = $idChofer;
            }
            if($habilitado != null){
                $this->habilitado = $habilitado;
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
                $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `vehiculo`(`marca`, `color`, `patente`, `habilitado`)VALUES (:marca,:color,:patente,:habilitado)");
                $consulta->bindValue(':marca', $this->marca, PDO::PARAM_STR);
                $consulta->bindValue(':color', $this->color, PDO::PARAM_STR);
                $consulta->bindValue(':patente', $this->patente, PDO::PARAM_STR);
                $consulta->bindValue(':habilitado', $this->habilitado, PDO::PARAM_STR);
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
        public static function Modificar($nuevoVehiculo){
            $itsOk = false;
            $vehiculo = vehiculo::TraerVehiculoPorId($nuevoVehiculo->id);
            if ($vehiculo != false) {
                $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
                $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `vehiculo` SET `marca`=:marca,`color`=:color,`patente`=:patente,`habilitado`=:habilitado WHERE id = :id");
                $consulta->bindValue(':marca', $nuevoVehiculo->marca, PDO::PARAM_STR);
                $consulta->bindValue(':color', $nuevoVehiculo->color, PDO::PARAM_STR);
                $consulta->bindValue(':patente', $nuevoVehiculo->patente, PDO::PARAM_STR);
                $consulta->bindValue(':id', $nuevoVehiculo->id, PDO::PARAM_STR);
                $consulta->bindValue(':habilitado', $nuevoVehiculo->habilitado, PDO::PARAM_STR);
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
        public static function TraerVehiculoPorId($id){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM vehiculo WHERE id = :id");
            $consulta->bindValue(':id', $id, PDO::PARAM_STR);
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_CLASS, 'vehiculo');
            $UsuarioBuscado= $consulta->fetch();
            return $UsuarioBuscado;
        }
        public static function TraerVehiculosDisponibles(){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM `vehiculo` WHERE id NOT IN (SELECT `idVehiculo` FROM viaje WHERE estado = 'En Viaje')");
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'vehiculo');
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
        /*public static function Baja($patente){
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
        }*/
        public static function Baja($id){
            $ret;
            $habilitar = 0;
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `vehiculo` SET habilitado = :habilitado WHERE id = :id");
            $consulta->bindValue(':habilitado', $habilitar, PDO::PARAM_INT);
            $consulta->bindValue(':id', $id, PDO::PARAM_INT);
            $ret['consulta'] = $consulta->execute();
            if ($ret['consulta']) {
                $ret['resultado'] = "Deshabilitado";
            }
            else{
                $ret['resultado'] = "Vehiculo Inexistente";
            }
            return $ret;
        }
    }
?>