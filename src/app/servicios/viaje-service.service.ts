import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';

@Injectable()
export class ViajeServiceService {
  url:string = "https://juanmurciautn.000webhostapp.com";
  //url:string = "http://localhost";
  constructor(public miHttp:MiHttpService) { }
  public traerListaCompleta(token:string){
    //return this.miHttp.httpGetPromise("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerTodos",token)
    return this.miHttp.httpGetPromise(this.url/*:8080*/+"/apiRestRemis/viaje/traerTodos",token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerTodosPorEstado(token:string,estado2:string){ // "En Viaje", "Pendiente", "Cancelado"
    let obj:any = {
      estado:estado2
    }
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerTodosPorEstado",obj,token)
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/traerTodosPorEstado",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerTodosPorChofer(token:string,idChofer2:number){
    let obj:any = {
      idChofer:idChofer2
    }
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerTodosPorChofer",obj,token)
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/traerTodosPorChofer",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerTodosPorVehiculo(token:string,idVehiculo2:number){
    let obj:any = {
      idVehiculo:idVehiculo2
    }
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerTodosPorVehiculo",obj,token)
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/traerTodosPorVehiculo",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerTodosPorCliente(token:string,idCliente2:number){
    let obj:any = {
      idCliente:idCliente2
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/traerTodosPorCliente",obj,token)
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerTodosPorCliente",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerPorId(token:string,id2:number){
    let obj:any = {
      id:id2
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/traerPorId",obj,token)
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerPorId",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }

  public realizarEncuesta(token:string,id2:number){
    let obj:any = {
      idViaje:id2
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/realizarEncuesta",obj,token)
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/realizarEncuesta",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public asignarChofer(token:string,idViajeA:number,idChoferA:number){
    let obj:any = {
      idViaje:idViajeA,
      idChofer:idChoferA
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/asignarChofer",obj,token)
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/asignarChofer",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public asignarVehiculo(token:string,idViajeA:number,idVehiculoA:number){
    let obj:any = {
      idViaje:idViajeA,
      idVehiculo:idVehiculoA
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/asignarVehiculo",obj,token)
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/asignarVehiculo",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public GuardarNuevo(token:string,viaje:any){
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/alta",viaje,token)
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/alta",viaje,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      console.log(error);
      console.info(error);
      return error;
    })
  }
  public GuardarEditado(token:string,viaje:any){
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/modificacion",viaje,token)
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/modificacion",viaje,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      console.log(error);
      console.info(error);
      return error;
    })
  }
  
  public CancelarViaje(token:string,idViaje:number){
    let obj:any = {
      id:idViaje
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/viaje/baja",obj,token)
    //return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/baja",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      console.log(error);
      console.info(error);
      return error;
    })
  }
}
