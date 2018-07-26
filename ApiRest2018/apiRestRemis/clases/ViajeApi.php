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
        $viaje = new viaje($ArrayDeParametros['origenDir'],$ArrayDeParametros['origenLat'],$ArrayDeParametros['origenLong'],$ArrayDeParametros['destinoDir'],$ArrayDeParametros['destinoLat'],$ArrayDeParametros['destinoLong'],$ArrayDeParametros['fecha'],$ArrayDeParametros['monto'],$ArrayDeParametros['hora'],$ArrayDeParametros['duracion'],$ArrayDeParametros['distancia'],$ArrayDeParametros['idCliente'],$ArrayDeParametros['idVehiculo'],$ArrayDeParametros['idChofer'],$ArrayDeParametros['estado'],$ArrayDeParametros['encuesta']);
        return $response->withJson($viaje->Guardar());
    }
    public function ModificarViaje($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $viaje = new viaje($ArrayDeParametros['origenDir'],$ArrayDeParametros['origenLat'],$ArrayDeParametros['origenLong'],$ArrayDeParametros['destinoDir'],$ArrayDeParametros['destinoLat'],$ArrayDeParametros['destinoLong'],$ArrayDeParametros['fecha'],$ArrayDeParametros['monto'],$ArrayDeParametros['hora'],$ArrayDeParametros['duracion'],$ArrayDeParametros['distancia'],$ArrayDeParametros['idCliente'],$ArrayDeParametros['idVehiculo'],$ArrayDeParametros['idChofer'],$ArrayDeParametros['estado'],$ArrayDeParametros['encuesta'],$ArrayDeParametros['id']);
        return $response->withJson(viaje::Modificar($viaje));
		//return $response->withJson($ArrayDeParametros['idChofer']);
    }
    public function BajaViaje($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        $viaje = $ArrayDeParametros['id'];
        return $response->withJson(viaje::CancelarViaje($viaje));
    }
    public function traerViajes($request, $response, $args){
        return $response->withJson(viaje::TraerTodosViajes());
    }
    public function traerViajesPorEstado($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::TraerViajesPorEstado($ArrayDeParametros['estado'])); // "En Viaje", "Pendiente", "Cancelado", "Finalizado"
    }
    public function traerViajesPorIdChofer($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::TraerViajesPorIdChofer($ArrayDeParametros['idChofer']));
    }
    public function traerViajesPorVehiculo($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::TraerViajesPorVehiculo($ArrayDeParametros['idVehiculo']));
    }
    public function traerViajesPorCliente($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::TraerViajesPorCliente($ArrayDeParametros['idCliente']));
    }
    public function traerViajesPorId($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::TraerViajesPorId($ArrayDeParametros['id']));
    }
    public function RealizarEncuesta($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::RealizarEncuesta($ArrayDeParametros['idViaje']));
    }
    public function FinalizarElViaje($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::FinalizarViaje($ArrayDeParametros['idViaje'],$ArrayDeParametros['monto']));
    }
    public function AsignarElChofer($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::AsignarChofer($ArrayDeParametros['idViaje'],$ArrayDeParametros['idChofer']));
    }
    public function AsignarElVehiculo($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::AsignarVehiculo($ArrayDeParametros['idViaje'],$ArrayDeParametros['idVehiculo']));
    }
    public function CancelarElViaje($request, $response, $args){
        $ArrayDeParametros = $request->getParsedBody();
        return $response->withJson(viaje::CancelarViaje($ArrayDeParametros['idViaje']));
    }
}
?>