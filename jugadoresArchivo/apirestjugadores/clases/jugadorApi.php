<?php
require_once 'Jugador.php';
require_once '../composer/vendor/autoload.php';
class jugadorApi
{
	public function Alta($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $Jugador = new Jugador($ArrayDeParametros['nombre'],$ArrayDeParametros['juego'],$ArrayDeParametros['resultado']);
        return $response->withJson($Jugador->Guardar());
    }
	public function traerJugadores($request, $response, $args){
        return $response->withJson(Jugador::TraerTodosJugadores());
    }
 	
     public function TraerTodos($request, $response, $args) {
     	$tamaño = filesize("usuarios.json");
      	$archivo=fopen("usuarios.json", 'r');
      	 $objeto=fread($archivo,$tamaño);
      	 $objeto=json_decode($objeto);
	    $newResponse = $response->withJson($objeto, 200);  
	    return $newResponse;
      
    }
     
	
}