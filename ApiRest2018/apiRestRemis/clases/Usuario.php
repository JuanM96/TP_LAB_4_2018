<?php 
    class usuario
    {
        public $id;
        public $nombre;
        public $sexo;
        public $usuario;
        public $password;
        public $perfil;
        public $habilitado;
        public $idVehiculo;
        public $estado;

        function __construct($nom = null,$sexo = null,$usuario = null,$pass = null,$perfil = null,$habilitado = null,$idVehiculo = null,$estado = null,$id = null)
        {
            if ($nom != null && $sexo != null &&  $usuario != null && $pass != null) {
                $this->nombre = $nom;
                $this->sexo = $sexo;
                $this->usuario = $usuario;
                $this->password = $pass;
            }
            if($habilitado != null){
                $this->habilitado = $habilitado;
            }
            if ($estado != null) {
                $this->estado = $estado;
            }
            if ($idVehiculo != null) {
                $this->idVehiculo = $idVehiculo;
            }
            if ($idVehiculo == null) {
                $this->idVehiculo = 0;
            }
            if($id != null){
                $this->id = $id;
            }
            if($perfil != null){
                $this->perfil = $perfil;
            }
        }
        public function Guardar(){
            $itsOk = false;
            $existeUsuario = $this->VerificarUsuario();
            if ($existeUsuario['resultado'] == false) {
                $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
                $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `usuario`(`nombre`, `sexo`, `usuario`, `password`, `perfil` , `habilitado` , `idVehiculo` , `estado`)VALUES (:nombre,:sexo,:usuario,:pass,:perfil,:habilitado,:idVehiculo,:estado)");
                $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
                //$consulta->bindValue(':mail', $this->mail, PDO::PARAM_STR);
                $consulta->bindValue(':sexo', $this->sexo, PDO::PARAM_STR);
                $consulta->bindValue(':usuario', $this->usuario, PDO::PARAM_STR);
                $consulta->bindValue(':pass', $this->password, PDO::PARAM_STR);
                $consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_STR);
                $consulta->bindValue(':habilitado', $this->habilitado, PDO::PARAM_STR);
                $consulta->bindValue(':idVehiculo', $this->idVehiculo, PDO::PARAM_INT);
                $consulta->bindValue(':estado', $this->estado, PDO::PARAM_STR);
                $itsOk = $consulta->execute();
            }
            if ($itsOk) {
                $ret['respuesta'] = "El Usuario Se Guardo Exitosamente";
                $ret['nombre'] = $this->nombre;
                $ret['sexo'] = $this->sexo;
                $ret['usuario'] = $this->usuario;
                $ret['password'] = $this->password;
                $ret['perfil'] = $this->perfil;
                $ret['habilitado'] = $this->habilitado;
                $ret['idVehiculo'] = $this->idVehiculo;
                $ret['estado'] = $this->estado;
            }
            else {
                $ret['respuesta'] = "ERROR, Usuario Ya Existente";
            }
            return $ret;
            
        }
        public static function Modificar($nuevoUsuario){
            $itsOk = false;
            $Usuario = usuario::TraerUsuarioPorUsuario($nuevoUsuario->id);
            if ($Usuario != false) {
                $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
                $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `usuario` SET `nombre`=:nombre,`sexo`=:sexo,`usuario`=:usuario,`password`=:pass, `perfil`=:perfil,`habilitado`=:habilitado,`idVehiculo`=:idVehiculo,`estado`=:estado WHERE id = :id");
                $consulta->bindValue(':nombre', $nuevoUsuario->nombre, PDO::PARAM_STR);
                $consulta->bindValue(':sexo', $nuevoUsuario->sexo, PDO::PARAM_STR);
                //$consulta->bindValue(':mail', $nuevoUsuario->mail, PDO::PARAM_STR);
                $consulta->bindValue(':usuario', $nuevoUsuario->usuario, PDO::PARAM_STR);
                $consulta->bindValue(':id', $nuevoUsuario->id, PDO::PARAM_STR);
                $consulta->bindValue(':pass', $nuevoUsuario->password, PDO::PARAM_STR);
                $consulta->bindValue(':perfil', $nuevoUsuario->perfil, PDO::PARAM_STR);            
                $consulta->bindValue(':habilitado', $nuevoUsuario->habilitado, PDO::PARAM_INT);
                $consulta->bindValue(':idVehiculo', $nuevoUsuario->idVehiculo, PDO::PARAM_INT);
                $consulta->bindValue(':estado', $nuevoUsuario->estado, PDO::PARAM_STR);
                $itsOk = $consulta->execute();
            }
            if ($itsOk) {
                $ret['respuesta'] = "El Usuario Se Modifico Exitosamente";
            }
            else {
                $ret['respuesta'] = "ERROR, Usuario Inexistente";
            }
            return $ret;
            
        }
        public static function EmpezarATrabajar($idChofer){
            $itsOk = false;
            $estado = "Trabajando";
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `usuario` SET `estado`=:estado WHERE id = :id");
            $consulta->bindValue(':id', $idChofer, PDO::PARAM_STR);
            $consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
            $itsOk = $consulta->execute();
            if ($itsOk) {
                $ret['respuesta'] = "El Chofer Se Modifico Exitosamente";
            }
            else {
                $ret['respuesta'] = "ERROR";
            }
            return $ret;
            
        }
        public static function DejarDeTrabajar($idChofer){
            $itsOk = false;
            $estado = "En Casa";
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `usuario` SET `estado`=:estado WHERE id = :id");
            $consulta->bindValue(':id', $idChofer, PDO::PARAM_STR);
            $consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
            $itsOk = $consulta->execute();
            if ($itsOk) {
                $ret['respuesta'] = "El Chofer Se Modifico Exitosamente";
            }
            else {
                $ret['respuesta'] = "ERROR";
            }
            return $ret;
            
        }
        public static function TraerTodosUsuarios(){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE 1");
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'usuario');
        }
        public static function TraerUsuarioPorUsuario($id){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE id = :id");
            $consulta->bindValue(':id', $id, PDO::PARAM_STR);
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_CLASS, 'usuario');
            $UsuarioBuscado= $consulta->fetch();
            return $UsuarioBuscado;
        }
        public static function TraerUsuarioPorPerfil($perfil){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE perfil = :perfil");
            $consulta->bindValue(':perfil', $perfil, PDO::PARAM_STR);
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'usuario');
        }
        public static function TraerChoferesDisponibles(){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM `usuario` WHERE perfil = 'chofer' AND estado = 'Trabajando' AND id NOT IN (SELECT `idChofer` FROM viaje WHERE estado = 'En Viaje')");
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'vehiculo');
        }
        public function VerificarUsuario(){
            $objetoAccesoDatos = AccesoDatos::DameUnObjetoAcceso();
            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM usuario WHERE usuario = :usuario");
            $consulta->bindValue(':usuario', $this->usuario, PDO::PARAM_STR);
            $consulta->setFetchMode(PDO::FETCH_CLASS, "usuario");
            if ($consulta->execute() && $ret['usuario'] = $consulta->fetch()) {
                $ret['resultado'] = true;
            }
            else {
                $ret['resultado'] = false;
            }
            return $ret;
        }
        public static function LogInVerificar($usuario,$password){
            $objetoAccesoDatos = AccesoDatos::DameUnObjetoAcceso();
            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT *  FROM usuario WHERE usuario = :usuario AND password = :password AND habilitado = 1");
            $consulta->bindValue(':usuario', $usuario, PDO::PARAM_STR);
            $consulta->bindValue(':password', $password, PDO::PARAM_STR);
            $consulta->setFetchMode(PDO::FETCH_CLASS, "usuario");
            if ($consulta->execute() && $ret['usuario'] = $consulta->fetch()) {
                $ret['logIn'] = true;
            }
            else {
                $ret['logIn'] = false;
            }
            return $ret;
        }
        public static function Deshabilitar($usuario){
            $ret;
            $habilitar = 0;
            $estado = "Deshabilitado";
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE `usuario` SET habilitado = :habilitado, estado = :estado WHERE usuario = :usuario");
            $consulta->bindValue(':habilitado', $habilitar, PDO::PARAM_INT);
            $consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
            $consulta->bindValue(':usuario', $usuario, PDO::PARAM_INT);
            $ret['consulta'] = $consulta->execute();
            if ($ret['consulta']) {
                $ret['resultado'] = "Deshabilitado";
            }
            else{
                $ret['resultado'] = "ERROR";
            }
            return $ret;
        }
    }
?>