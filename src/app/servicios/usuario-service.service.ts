import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';
@Injectable()
export class UsuarioServiceService {
  url:string = "https://juanmurciautn.000webhostapp.com";
  //url:string = "http://localhost";
  constructor(public miHttp:MiHttpService) { }
  public traerListaCompleta(token:string){
    return this.miHttp.httpGetPromise(this.url/*:8080*/+"/apiRestRemis/usuario/traerTodos",token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerDisponibles(token:string){
    return this.miHttp.httpGetPromise(this.url/*:8080*/+"/apiRestRemis/usuario/traerTodosChoferesDisponibles",token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public traerListaPorPerfil(token:string,perfil2:string){
    let obj:any = {
      perfil:perfil2
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/usuario/traerTodosPorPerfil",obj,token)
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
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/usuario/traerUno",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public ponerATrabajar(token:string,id2:number){
    let obj:any = {
      id:id2
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/usuario/empezarATrabajar",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public dejarDeTrabajar(token:string,id2:number){
    let obj:any = {
      id:id2
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/usuario/dejarDeTrabajar",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  
  public GuardarNuevo(token:string,usuario:any){
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/usuario/alta",usuario,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      console.log(error);
      console.info(error);
      return error;
    })
  }
  public GuardarEditado(token:string,usuario:any){
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/usuario/modificacion",usuario,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      console.log(error);
      console.info(error);
      return error;
    })
  }
  public Borrar(token:string,usu:string){
    let obj:any = {
      usuario:usu
    }
    return this.miHttp.httpPostPromiseWithToken(this.url/*:8080*/+"/apiRestRemis/usuario/baja",obj,token)
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
