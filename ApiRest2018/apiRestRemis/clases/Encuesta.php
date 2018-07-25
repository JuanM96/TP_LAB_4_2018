<?php 
    class encuesta
    {
        public $id;
        public $nombre;
        public $pregunta1;
        public $respuesta1;
        public $pregunta2;
        public $respuesta2;
        public $pregunta3;
        public $repuesta3;
        //public $estado;

        function __construct($pregunta1 = null,$respuesta1 = null,$pregunta2 = null,$respuesta2 = null,$pregunta3 = null,$respuesta3 = null,$nom = null,$id = null)
        {
            if ($pregunta1 != null) {
                $this->pregunta1 = $pregunta1;
            }
            if ($respuesta1 != null) {
                $this->respuesta1 = $respuesta1;
            }
            if ($pregunta2 != null) {
                $this->pregunta2 = $pregunta2;
            }
			/*if ($pregunta2 == null) {
                $this->$pregunta2 = "¿Como Calificaria El Servicio?";
            }*/
            if ($respuesta2 != null) {
                $this->respuesta2 = $respuesta2;                
            }
            if ($pregunta3 != null) {
                $this->pregunta3 = $pregunta3;                
            }
            if($nom != null){
                $this->nombre = $nom;
            }
            if ($respuesta3 != null) {
                $this->respuesta3 = $respuesta3;                
            }
            /*if ($pregunta4 != null) {
                $this->pregunta4 = $pregunta4;
            }*/
            if($id != null){
                $this->id = $id;
            }
        }
        public function Guardar(){
            $itsOk = false;
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `encuesta`(`nombre`, `pregunta1`, `respuesta1`, `pregunta2`, `respuesta2` , `pregunta3` , `respuesta3`)VALUES (:nombre,:pregunta1,:respuesta1,:pregunta2,:respuesta2,:pregunta3,:respuesta3)");
            $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
            $consulta->bindValue(':pregunta1', $this->pregunta1, PDO::PARAM_STR);
            $consulta->bindValue(':respuesta1', $this->respuesta1, PDO::PARAM_STR);
            $consulta->bindValue(':pregunta2', $this->pregunta2, PDO::PARAM_STR);
            $consulta->bindValue(':respuesta2', $this->respuesta2, PDO::PARAM_STR);
            $consulta->bindValue(':pregunta3', $this->pregunta3, PDO::PARAM_STR);
            $consulta->bindValue(':respuesta3', $this->respuesta3, PDO::PARAM_INT);
            $itsOk = $consulta->execute();
            if ($itsOk) {
                $ret['respuesta'] = "La Encuesta Se Guardo Exitosamente";
            }
            else {
                $ret['respuesta'] = "ERROR, La Encuesta No se Guardo";
            }
            return $ret;
        }
        public static function TraerTodasEncuestas(){
            $objetoAccesoDato = AccesoDatos::DameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM encuesta WHERE 1");
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_CLASS, 'encuesta');
        }

    }
    
?> 