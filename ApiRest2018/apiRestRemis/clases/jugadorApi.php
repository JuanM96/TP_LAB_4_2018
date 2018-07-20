<?php
require_once 'Jugador.php';
require_once 'AutentificadorJWT.php';
require_once './composer/vendor/autoload.php';
class jugadorApi
{
	public function Alta($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $Jugador = new Jugador($ArrayDeParametros['username'],$ArrayDeParametros['password'],$ArrayDeParametros['email']);
        return $response->withJson($Jugador->Guardar());
    }
    public function LogIn($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $usuario = $ArrayDeParametros['username'];
        $password = $ArrayDeParametros['password'];
        $ret = Jugador::LogInVerificar($usuario,$password);
        if ($ret['logIn']){
            $jugador = Jugador::TraerJugadorPorUsuario($usuario);
            $ret['token'] = autentificadorJWT::CrearToken(array(
                'usuario'=> $jugador->usuario,
                'password'=> $jugador->password
                //'admin' => $jugador->admin,
            ));
            //$logEmpleado = new logEmpleado($jugador);
            //$logEmpleado->Guardar();
        }
		return $response->withJson($ret);
    }
	public function traerJugadores($request, $response, $args){
        return $response->withJson(Jugador::TraerTodosJugadores());
    }
 	

     
	
}