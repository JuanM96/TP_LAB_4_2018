<?php
class Jugador
{
    public $usuario;
    public $password;
    public $email;
    function __construct($usuario = null,$password = null,$email = null)
    {
        if ($usuario != null && $password != null && $email != null ) {
            $this->usuario = $usuario;
            $this->password = $password;
            $this->email = $email;
        }
    }
    public function Guardar(){
        $itsOk = false;
        $existeUsuario = $this->VerificarUsuario();
        if ($existeUsuario['resultado'] == false) {
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `jugadores`(`usuario`, `password`, `email`)VALUES (:usuario,:password,:email)");
            $consulta->bindValue(':usuario', $this->usuario, PDO::PARAM_STR);
            $consulta->bindValue(':password', $this->password, PDO::PARAM_STR);
            $consulta->bindValue(':email', $this->email, PDO::PARAM_STR);
            $itsOk = $consulta->execute();
        }
        if ($itsOk) {
            $ret['respuesta'] = "Resgistrado Exitosamente";
        }
        else {
            $ret['respuesta'] = "ERROR,Usuario ya registrado por favor elija otro";
        }
        return $ret;
    }
    public function VerificarUsuario(){
        $objetoAccesoDatos = AccesoDatos::DameUnObjetoAcceso();
        $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM jugadores WHERE usuario = :usuario");
        $consulta->bindValue(':usuario', $this->usuario, PDO::PARAM_STR);
        $consulta->setFetchMode(PDO::FETCH_CLASS, "jugador");
        if ($consulta->execute() && $ret['jugador'] = $consulta->fetch()) {
            $ret['resultado'] = true;
        }
        else {
            $ret['resultado'] = false;
        }
        return $ret;
    }
    public static function LogInVerificar($usuario,$password){
        $objetoAccesoDatos = AccesoDatos::DameUnObjetoAcceso();
        $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM jugadores WHERE usuario = :usuario AND password = :password");
        $consulta->bindValue(':usuario', $usuario, PDO::PARAM_STR);
        $consulta->bindValue(':password', $password, PDO::PARAM_STR);
        $consulta->setFetchMode(PDO::FETCH_CLASS, "jugador");
        if ($consulta->execute() && $ret['jugador'] = $consulta->fetch()) {
            $ret['logIn'] = true;
        }
        else {
            $ret['logIn'] = false;
        }
        return $ret;
    }
    public static function TraerTodosJugadores(){
        $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM jugadores WHERE 1");
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_CLASS, 'Jugador');
    }
    public static function TraerJugadorPorUsuario($usuario){
        $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM jugadores WHERE usuario = :usuario");
        $consulta->bindValue(':usuario', $usuario, PDO::PARAM_STR);
		$consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_CLASS, 'jugador');
		$UsuarioBuscado= $consulta->fetch();
		return $UsuarioBuscado;
    }
}

?>