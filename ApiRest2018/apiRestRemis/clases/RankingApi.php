<?php
require_once 'Ranking.php';
require_once './composer/vendor/autoload.php';
class rankingApi
{
	public function Alta($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $ranking = new ranking($ArrayDeParametros['nombreUsuario'],$ArrayDeParametros['juego'],$ArrayDeParametros['resultado']);
        return $response->withJson($ranking->Guardar());
    }
	public function traerRankings($request, $response, $args){
        return $response->withJson(ranking::TraerTodosrankings());
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