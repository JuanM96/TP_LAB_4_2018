<?php 
    class viaje
    {
        public $id;
        public $origenLat;
        public $origenLong;
        public $destinoLat;
        public $destinoLong;
        public $fecha;
        public $monto;
        public $idChofer;
        public $idVehiculo;
        public $estado;
        public $encuesta;

        function __construct($origenLat = null,$origenLong = null,$destinoLat = null,$destinoLong = null,$fecha = null,$monto = null,$idVehiculo = null,$idChofer = null,$estado = null,$encuesta = null,$id = null)
        {
            if ($origenLat != null && $origenLong != null && $destinoLat != null && $destinoLong != null &&  $fecha != null && $monto != null && $idVehiculo != null) {
                $this->origenLat = $origenLat;
                $this->origenLong = $origenLong;
                $this->destinoLat = $destinoLat;
                $this->destinoLong = $destinoLong;
                $this->fecha = $fecha;
                $this->monto = $monto;
                $this->idVehiculo = $idVehiculo;
                //$this->estado = $estado;
            }
            if ($idChofer != null) {
                $this->idChofer = $idChofer;
            }
            if ($estado != null) {
                $this->estado = $estado;
            }
            if ($idChofer == null) {
                $this->idChofer = 0;
            }
            if ($encuesta != null) {
                $this->encuesta = $encuesta;
            }
            if ($encuesta == null) {
                $this->encuesta = 0;
            }
            if ($estado == null) {
                $this->estado = "Pendiente";
            }
            if($id != null){
                $this->id = $id;
            }
        }
        public function Guardar(){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `viaje`(`origenLat`, `origenLong`, `destinoLat`, `destinoLong`, `fecha`, `monto`, `idVehiculo`, `idChofer`, `estado`, `encuesta`)VALUES (:origenLat,:origenLong,:destinoLat,:destinoLong,:fecha,:monto,:idVehiculo,:idChofer,:estado,:encuesta)");
            $consulta->bindValue(':origenLat', $this->origenLat, PDO::PARAM_STR);
            $consulta->bindValue(':origenLong', $this->origenLong, PDO::PARAM_STR);
            $consulta->bindValue(':destinoLat', $this->destinoLat, PDO::PARAM_STR);
            $consulta->bindValue(':destinoLong', $this->destinoLong, PDO::PARAM_STR);
            $consulta->bindValue(':fecha', $this->fecha, PDO::PARAM_STR);
            $consulta->bindValue(':monto', $this->monto, PDO::PARAM_STR);
            $consulta->bindValue(':idVehiculo', $this->idVehiculo, PDO::PARAM_INT);
            $consulta->bindValue(':idChofer', $this->idChofer, PDO::PARAM_INT);
            $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);
            $consulta->bindValue(':encuesta', $this->encuesta, PDO::PARAM_INT);
            $itsOk = $consulta->execute();
            if ($itsOk) {
                $ret['respuesta'] = "El Viaje Se Guardo Exitosamente";
            }
            else {
                $ret['respuesta'] = "ERROR Al Registrar El Viaje";
            }
            return $ret;
            
        }
        public static function Modificar($nuevoViaje){
            $itsOk = false;
            $viaje = viaje::TraerViajePorId($nuevoViaje->id);
            if ($viaje != false) {
                $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
                $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `viaje` SET `origenLat`=:origenLat,`origenLong`=:origenLong,`destinoLat`=:destinoLat,`destinoLong`=:destinoLong,`fecha`=:fecha,`monto`=:monto,`idVehiculo`=:idVehiculo,`idChofer`=:idChofer,`estado`=:estado,`encuesta`=:encuesta WHERE id = :id");
                $consulta->bindValue(':origenLat', $nuevoViaje->origenLat, PDO::PARAM_STR);
                $consulta->bindValue(':origenLong', $nuevoViaje->origenLong, PDO::PARAM_STR);
                $consulta->bindValue(':destinoLat', $nuevoViaje->destinoLat, PDO::PARAM_STR);
                $consulta->bindValue(':destinoLong', $nuevoViaje->destinoLong, PDO::PARAM_STR);
                $consulta->bindValue(':fecha', $nuevoViaje->fecha, PDO::PARAM_STR);
                $consulta->bindValue(':monto', $nuevoViaje->monto, PDO::PARAM_INT);
                $consulta->bindValue(':idVehiculo', $nuevoViaje->idVehiculo, PDO::PARAM_INT);
                $consulta->bindValue(':idChofer', $nuevoViaje->idChofer, PDO::PARAM_INT);
                $consulta->bindValue(':estado', $nuevoViaje->estado, PDO::PARAM_STR);
                $consulta->bindValue(':encuesta', $nuevoViaje->encuesta, PDO::PARAM_STR);
                $consulta->bindValue(':id', $nuevoViaje->id, PDO::PARAM_INT);
                $itsOk = $consulta->execute();
            }
            if ($itsOk) {
                $ret['respuesta'] = "El Viaje Se Modifico Exitosamente";
            }
            else {
                $ret['respuesta'] = "ERROR, Viaje Inexistente";
            }
            return $ret;
            
        }
        public static function AsignarChofer($idViaje,$idChofer){
            $estado = "En Viaje";
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `viaje` SET `idChofer`=:idChofer, `estado`=:estado WHERE id = :idViaje");
            $consulta->bindValue(':idViaje', $idViaje, PDO::PARAM_INT);
            $consulta->bindValue(':idChofer', $idChofer, PDO::PARAM_INT);
            $consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
            $itsOk = $consulta->execute();
            if ($itsOk) {
                $ret['respuesta'] = "El Viaje Fue Asignado";
            }
            else {
                $ret['respuesta'] = "ERROR, Al Asignar El Viaje";
            }
            return $ret;
        }
        public static function FinalizarViaje($idViaje,$monto){
            $estado = "Finalizado";
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `viaje` SET `estado`=:estado `monto`=:monto WHERE id = :idViaje");
            $consulta->bindValue(':idViaje', $idViaje, PDO::PARAM_INT);
            $consulta->bindValue(':monto', $monto, PDO::PARAM_INT);
            $consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
            $itsOk = $consulta->execute();
            if ($itsOk) {
                $ret['respuesta'] = "El Viaje Fue Finalizado";
            }
            else {
                $ret['respuesta'] = "ERROR, Al Finalizar El Viaje";
            }
            return $ret;
        }
        public static function CancelarViaje($idViaje){
            $estado = "Cancelado";
            $monto = 0;
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `viaje` SET `estado`=:estado `monto`=:monto WHERE id = :idViaje");
            $consulta->bindValue(':idViaje', $idViaje, PDO::PARAM_INT);
            $consulta->bindValue(':monto', $monto, PDO::PARAM_INT);
            $consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
            $itsOk = $consulta->execute();
            if ($itsOk) {
                $ret['respuesta'] = "El Viaje Fue Cancelado"; 
            }
            else {
                $ret['respuesta'] = "ERROR, Al Cancelar El Viaje";
            }
            return $ret;
        }
        public static function RealizarEncuesta($idViaje){
            $encuesta = 1;
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `viaje` SET `encuesta`=:encuesta WHERE id = :idViaje");
            $consulta->bindValue(':idViaje', $idViaje, PDO::PARAM_INT);
            $consulta->bindValue(':encuesta', $encuesta, PDO::PARAM_STR);
            $itsOk = $consulta->execute();
            if ($itsOk) {
                $ret['respuesta'] = "La Encuesta Fue Realizada Con Exito"; 
            }
            else {
                $ret['respuesta'] = "ERROR, Al Realizar La Encuesta";
            }
            return $ret;
        }
        public static function TraerTodosViajes(){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM viaje WHERE 1");
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'viaje');
        }
        public static function TraerViajesPorEstado($estado){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM vehiculo WHERE estado = :estado");
            $consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'viaje');;
        }
        public static function TraerViajesPorIdChofer($idChofer){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM viaje WHERE idChofer = :idChofer");
            $consulta->bindValue(':idChofer', $idChofer, PDO::PARAM_INT);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'viaje');
        }
        public static function TraerViajesPorVehiculo($idVehiculo){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM viaje WHERE idVehiculo = :idVehiculo");
            $consulta->bindValue(':idVehiculo', $idVehiculo, PDO::PARAM_INT);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'viaje');
        }
        public static function TraerViajePorId($id){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM viaje WHERE id = :id");
            $consulta->bindValue(':id', $id, PDO::PARAM_STR);
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_CLASS, 'viaje');
            $viajeBuscado= $consulta->fetch();
            return $viajeBuscado;
        }
/*         public function VerificarVehiculo(){
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
        } */
    }
?>