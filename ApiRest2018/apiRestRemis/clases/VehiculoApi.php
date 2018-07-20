<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once 'Vehiculo.php';
//require_once 'LogEmpleado.php';
require_once 'AutentificadorJWT.php';
require_once './composer/vendor/autoload.php';
class VehiculoApi
{
    public function AltaVehiculo($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $vehiculo = new vehiculo($ArrayDeParametros['marca'],$ArrayDeParametros['color'],$ArrayDeParametros['patente'],$ArrayDeParametros['idChofer']);
        return $response->withJson($vehiculo->Guardar());
    }
    public function ModificarVehiculo($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $vehiculoBuscado = $ArrayDeParametros['patenteBuscada'];
        $vehiculo = new vehiculo($ArrayDeParametros['marca'],$ArrayDeParametros['color'],$ArrayDeParametros['patente'],$ArrayDeParametros['idChofer']);
        return $response->withJson(vehiculo::Modificar($vehiculo,$vehiculoBuscado));
    }
    public function BajaVehiculo($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $vehiculo = $ArrayDeParametros['patente'];
        return $response->withJson(vehiculo::Baja($vehiculo));
    }
    public function traerVehiculos($request, $response, $args){
        return $response->withJson(vehiculo::TraerTodosVehiculos());
    }
    public function traerVehiculoPorPatente($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(vehiculo::TraerVehiculoPorPatente($ArrayDeParametros['patente']));
    }
    public function traerVehiculoPorIdChofer($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(vehiculo::TraerVehiculoPorIdChofer($ArrayDeParametros['idChofer']));
    }
}
?>