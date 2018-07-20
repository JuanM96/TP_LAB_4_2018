<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once 'Viaje.php';
//require_once 'LogEmpleado.php';
require_once 'AutentificadorJWT.php';
require_once './composer/vendor/autoload.php';
class ViajeApi
{
    public function AltaViaje($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $viaje = new viaje($ArrayDeParametros['origenLat'],$ArrayDeParametros['origenLong'],$ArrayDeParametros['destinoLat'],$ArrayDeParametros['destinoLong'],$ArrayDeParametros['fecha'],$ArrayDeParametros['monto']);
        return $response->withJson($viaje->Guardar());
    }
    /* public function ModificarVehiculo($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $vehiculoBuscado = $ArrayDeParametros['patenteBuscada'];
        $vehiculo = new vehiculo($ArrayDeParametros['marca'],$ArrayDeParametros['color'],$ArrayDeParametros['patente'],$ArrayDeParametros['idChofer']);
        return $response->withJson(vehiculo::Modificar($vehiculo,$vehiculoBuscado));
    } */
    public function BajaViaje($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $viaje = $ArrayDeParametros['idViaje'];
        return $response->withJson(viaje::Baja($viaje));
    }
    public function traerViajes($request, $response, $args){
        return $response->withJson(viaje::TraerTodosViajes());
    }
    public function traerViajesPorEstado($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::TraerViajesPorEstado($ArrayDeParametros['estado'])); // "En Viaje", "Pendiente", "Cancelado"
    }
    public function traerViajesPorIdChofer($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::TraerViajesPorIdChofer($ArrayDeParametros['idChofer']));
    }
    public function FinalizarElViaje($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::FinalizarViaje($ArrayDeParametros['idViaje'],$ArrayDeParametros['monto']));
    }public function AsignarElChofer($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::AsignarChofer($ArrayDeParametros['idViaje'],$ArrayDeParametros['idChofer']));
    }public function CancelarElViaje($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::CancelarViaje($ArrayDeParametros['idViaje']));
    }
}
?>