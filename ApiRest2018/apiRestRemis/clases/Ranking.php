<?php
class ranking
{
    public $nombreUsuario;
    public $juego;
    public $resultado;
    function __construct($nombreUsuario = null,$juego = null,$resultado = null)
    {
        if ($nombreUsuario != null && $juego != null && $resultado != null ) {
            $this->nombreUsuario = $nombreUsuario;
            $this->juego = $juego;
            $this->resultado = $resultado;
        }
    }
    public function Guardar(){
        $itsOk = false;
        $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `rankings`(`nombreUsuario`, `juego`, `resultado`)VALUES (:nombreUsuario,:juego,:resultado)");
        $consulta->bindValue(':nombreUsuario', $this->nombreUsuario, PDO::PARAM_STR);
        $consulta->bindValue(':juego', $this->juego, PDO::PARAM_STR);
        $consulta->bindValue(':resultado', $this->resultado, PDO::PARAM_STR);
        $itsOk = $consulta->execute();
        if ($itsOk) {
            $ret['respuesta'] = "El resultado Se Guardo Exitosamente";
        }
        else {
            $ret['respuesta'] = "ERROR";
        }
        return $ret;
    }
    public static function TraerTodosRankings(){
        $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM rankings WHERE 1");
		$consulta->execute();
		return $consulta->fetchAll(PDO::FETCH_CLASS, 'ranking');
    }

}

?>