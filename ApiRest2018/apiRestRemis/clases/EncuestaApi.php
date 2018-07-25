<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once 'Encuesta.php';
require_once 'AutentificadorJWT.php';
require_once './composer/vendor/autoload.php';
class EncuestaApi
{
    public function altaEncuesta($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $Encuesta = new encuesta($ArrayDeParametros['pregunta1'],$ArrayDeParametros['respuesta1'],$ArrayDeParametros['pregunta2'],$ArrayDeParametros['respuesta2'],$ArrayDeParametros['pregunta3'],$ArrayDeParametros['respuesta3'],$ArrayDeParametros['nombre']);
        return $response->withJson($Encuesta->Guardar());
		//return $response->withJson($ArrayDeParametros);
    }
    public function traerEncuestas($request, $response, $args){
        return $response->withJson(encuesta::TraerTodasEncuestas());
    }
}
?>