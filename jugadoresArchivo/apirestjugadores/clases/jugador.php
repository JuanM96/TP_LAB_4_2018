<?php
class Jugador
{
    public $nombre;
    public $juego;
    public $resultado;
    function __construct($nombre = null,$juego = null,$resultado = null)
    {
        if ($nombre != null && $juego != null && $resultado != null ) {
            $this->nombre = $nombre;
            $this->juego = $juego;
            $this->resultado = $resultado;
        }
    }
    public function Guardar(){
        $itsOk = false;
        $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `jugadores`(`nombre`, `juego`, `resultado`)VALUES (:nombre,:juego,:resultado)");
        $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':juego', $this->juego, PDO::PARAM_STR);
        $consulta->bindValue(':resultado', $this->resultado, PDO::PARAM_STR);
        $itsOk = $consulta->execute();
        if ($itsOk) {
            $ret['respuesta'] = "El Jugador Se Guardo Exitosamente";
        }
        else {
            $ret['respuesta'] = "ERROR";
        }
        return $ret;
    }
    public static function TraerTodosJugadores(){
        $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT `nombre` AS nombre, `juego` AS juego, `resultado` AS resultado FROM jugadores WHERE 1");
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_CLASS, 'Jugador');
    }
}

?>