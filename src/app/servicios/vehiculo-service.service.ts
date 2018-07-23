import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';
@Injectable()
export class VehiculoServiceService {

  constructor(public miHttp:MiHttpService) { }
  public traerListaCompleta(token:string){
    return this.miHttp.httpGetPromise("http://localhost"/*:8080*/+"/apiRestRemis/vehiculo/traerTodos",token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerUnoPorPatente(token:string,patente2:string){
    let obj:any = {
      patente:patente2
    }
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/vehiculo/traerUnoPatente",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerUnoPorId(token:string,idVehiculo:number){
    let obj:any = {
      id:idVehiculo
    }
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/vehiculo/traerUnoId",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerDisponibles(token:string){
    return this.miHttp.httpGetPromise("http://localhost"/*:8080*/+"/apiRestRemis/vehiculo/traerDisponibles",token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public GuardarNuevo(token:string,vehiculo:any){
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/vehiculo/alta",vehiculo,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      console.log(error);
      console.info(error);
      return error;
    })
  }
  public GuardarEditado(token:string,vehiculo:any){
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/vehiculo/modificacion",vehiculo,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      console.log(error);
      console.info(error);
      return error;
    })
  }
  public Borrar(token:string,idVehiculo:number){
    let obj:any = {
      id:idVehiculo
    }
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/vehiculo/baja",obj,token)
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
