<?php
/**
 * 
 */
require_once 'AutentificadorJWT.php';
require_once './composer/vendor/autoload.php';
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
class VerificarJWT
{
    public function VerificarToken($request, $response, $next){
        if($request->hasHeader('token')){
            $token = $request->getHeader('token')[0];
            try{
                $datos = autentificadorJwt::ObtenerData($token);
            }
            catch(Exception $e){
                return $response->withJson($e->getMessage(), 511);
            }
            if($datos){
                $request = $request->withAttribute('datos', $datos);
                return $next($request, $response);    
            }
            return $response->withJson("Token Caducado",400);
        }
        else{
            $token = $request->getAttribute('route')->getArgument('token');
            if($token){
                try{
                    $datos = autentificadorJWT::ObtenerData($token);
                }
                catch(Exception $e){
                    return $response->withJson($e->getMessage(), 511);
                }
                $request = $request->withAttribute('datos', $datos);
                return $next($request, $response);
            }
        }
        return $response->withJson("No se encuentra el token", 400);
    }
}


?>