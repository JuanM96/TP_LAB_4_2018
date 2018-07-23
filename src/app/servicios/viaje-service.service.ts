import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';

@Injectable()
export class ViajeServiceService {

  constructor(public miHttp:MiHttpService) { }
  public traerListaCompleta(token:string){
    return this.miHttp.httpGetPromise("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerTodos",token)
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
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerTodosPorEstado",obj,token)
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
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerTodosPorChofer",obj,token)
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
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerTodosPorVehiculo",obj,token)
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
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/traerPorId",obj,token)
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
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/RealizarEncuesta",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public GuardarNuevo(token:string,viaje:any){
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/alta",viaje,token)
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
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/modificacion",viaje,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      console.log(error);
      console.info(error);
      return error;
    })
  }
  
  public Borrar(token:string,idViaje:number){
    let obj:any = {
      id:idViaje
    }
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/viaje/baja",obj,token)
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
