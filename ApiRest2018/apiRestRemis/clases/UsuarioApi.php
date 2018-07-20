<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once 'Usuario.php';
//require_once 'LogEmpleado.php';
require_once 'AutentificadorJWT.php';
require_once './composer/vendor/autoload.php';
class UsuarioApi
{
    public function AltaUsuario($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $Usuario = new usuario($ArrayDeParametros['nombre'],$ArrayDeParametros['sexo'],$ArrayDeParametros['usuario'],$ArrayDeParametros['password'],$ArrayDeParametros['perfil'],$ArrayDeParametros['habilitado'],$ArrayDeParametros['idVehiculo'],$ArrayDeParametros['estado']);
        return $response->withJson($Usuario->Guardar());
    }
    public function ModificarUsuario($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $Usuario = new usuario($ArrayDeParametros['nombre'],$ArrayDeParametros['sexo'],$ArrayDeParametros['usuario'],$ArrayDeParametros['password'],$ArrayDeParametros['perfil'],$ArrayDeParametros['habilitado'],$ArrayDeParametros['idVehiculo'],$ArrayDeParametros['estado'],$ArrayDeParametros['id']);
        return $response->withJson(usuario::Modificar($Usuario));
    }
    public function BajaUsuario($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $usuario = $ArrayDeParametros['usuario'];
        return $response->withJson(usuario::Deshabilitar($usuario));
    }
    /*public function ActualizarEstadoUsuario($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $usuario = intval($ArrayDeParametros['usuario']);
        $Usuario = usuario::TraerUsuarioPorusuario($usuario);
        return $response->withJson($Usuario->ActualizarEstado());
    }*/
    public function LogIn($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $usuario = $ArrayDeParametros['usuario'];
        $password = $ArrayDeParametros['password'];
        $ret = usuario::LogInVerificar($usuario,$password);
        if ($ret['logIn']){
            $ret['token'] = autentificadorJWT::CrearToken(array(
                'usuario'=> $ArrayDeParametros['usuario'],
                //'admin' => $Usuario->admin,
            ));
            //$logEmpleado = new logEmpleado($usuario);
            //$logEmpleado->Guardar();
        }
        else{
            $ret['user'] = $ArrayDeParametros['usuario'];
            $ret['pass'] = $ArrayDeParametros['password'];
        }
		return $response->withJson($ret);
    }
    public function traerUsuarios($request, $response, $args){
        return $response->withJson(usuario::TraerTodosUsuarios());
    }
    public function traerUsuarioPorUsuario($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(usuario::TraerUsuarioPorUsuario($ArrayDeParametros['id']));
    }
    public function traerUsuarioPorPerfil($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(usuario::TraerUsuarioPorPerfil($ArrayDeParametros['perfil']));
    }
    /*public function RecuperarPassword($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(usuario::RecuperarPassword($ArrayDeParametros['mail']));
    }*/
}
?>