<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './composer/vendor/autoload.php';
require_once '/clases/AccesoDatos.php';
require_once '/clases/jugadorApi.php';
require_once '/clases/RankingApi.php';
require_once '/clases/VerificarJWT.php';
require_once '/clases/UsuarioApi.php';
require_once '/clases/VehiculoApi.php';
require_once '/clases/ViajeApi.php';
require_once '/clases/EncuestaApi.php';
require_once '/clases/MWparaCORS.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

/*

¡La primera línea es la más importante! A su vez en el modo de 
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola 
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length, 
  lo que hace que Slim se comporte de manera más predecible.
*/
$app = new \Slim\App(["settings" => $config]);
$app->group('/usuario', function () {
    $this->post('/alta', \UsuarioApi::class . ':AltaUsuario');
    $this->post('/baja', \UsuarioApi::class . ':BajaUsuario');
    $this->post('/modificacion', \UsuarioApi::class . ':ModificarUsuario');
    $this->post('/empezarATrabajar', \UsuarioApi::class . ':empezarATrabajar');
    $this->post('/dejarDeTrabajar', \UsuarioApi::class . ':dejarDeTrabajar');
    $this->get('/traerTodos', \UsuarioApi::class . ':traerUsuarios');
    $this->get('/traerTodosChoferesDisponibles', \UsuarioApi::class . ':traerChoferesDisponibles');
    $this->post('/traerTodosPorPerfil', \UsuarioApi::class . ':traerUsuarioPorPerfil');
    $this->post('/traerUno', \UsuarioApi::class . ':traerUsuarioPorUsuario');
}) ->add(\verificarJWT::class . ':VerificarToken') ->add(\MWparaCORS::class . ':HabilitarCORSTodos');
$app->group('/vehiculo', function () {
    $this->post('/alta', \VehiculoApi::class . ':AltaVehiculo');
    $this->post('/baja', \VehiculoApi::class . ':BajaVehiculo');
    $this->post('/modificacion', \VehiculoApi::class . ':ModificarVehiculo');
    $this->get('/traerTodos', \VehiculoApi::class . ':traerVehiculos');
    $this->post('/traerUnoPatente', \VehiculoApi::class . ':traerVehiculoPorPatente');
    $this->post('/traerUnoId', \VehiculoApi::class . ':traerVehiculoPorId');
    $this->get('/traerDisponibles', \VehiculoApi::class . ':traerVehiculosDisponibles');
}) ->add(\verificarJWT::class . ':VerificarToken') ->add(\MWparaCORS::class . ':HabilitarCORSTodos');
$app->group('/viaje', function () {
    $this->post('/alta', \ViajeApi::class . ':AltaViaje');
    $this->post('/baja', \ViajeApi::class . ':BajaViaje');
    $this->post('/modificacion', \ViajeApi::class . ':ModificarViaje');
    $this->post('/asignarChofer', \ViajeApi::class . ':AsignarElChofer');
    $this->post('/asignarVehiculo', \ViajeApi::class . ':AsignarElVehiculo');
    $this->post('/finalizarViaje', \ViajeApi::class . ':FinalizarElViaje');
    $this->post('/cancelarViaje', \ViajeApi::class . ':CancelarElViaje');
    $this->post('/realizarEncuesta', \ViajeApi::class . ':RealizarEncuesta');
    $this->get('/traerTodos', \ViajeApi::class . ':traerViajes');
    $this->post('/traerTodosPorEstado', \ViajeApi::class . ':traerViajesPorEstado');
    $this->post('/traerTodosPorChofer', \ViajeApi::class . ':traerViajesPorIdChofer');
    $this->post('/traerTodosPorVehiculo', \ViajeApi::class . ':traerViajesPorVehiculo');
    $this->post('/traerTodosPorCliente', \ViajeApi::class . ':traerViajesPorCliente');
    $this->post('/traerPorId', \ViajeApi::class . ':traerViajesPorId');
}) ->add(\verificarJWT::class . ':VerificarToken') ->add(\MWparaCORS::class . ':HabilitarCORSTodos');
$app->group('/encuesta', function () {
    $this->post('/alta', \EncuestaApi::class . ':altaEncuesta');
    $this->get('/traerTodos', \EncuestaApi::class . ':traerEncuestas');
}) ->add(\verificarJWT::class . ':VerificarToken') ->add(\MWparaCORS::class . ':HabilitarCORSTodos');
$app->group('/ingreso', function () {
    $this->post('/logIn', \UsuarioApi::class . ':LogIn');
    $this->post('/registro', \UsuarioApi::class . ':AltaUsuario');
});
$app->run();