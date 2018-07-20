import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';
@Injectable()
export class UsuarioServiceService {

  constructor(public miHttp:MiHttpService) { }
  public traerListaCompleta(token:string){
    this.miHttp.httpGetPromise("http://localhost"/*:8080*/+"/apiRestRemis/usuario/traerTodos",token)
    .then(datos => {
      console.info(datos)
      let ret = {
        listado:datos,
        error:false
      }
      return ret;
    })
    .catch(error =>{
      let ret = {
        listado:false,
        error:true,
        errorMsg:error
      }
      return ret;
    })
  }
  public traerListaPorPerfil(token:string,perfil2:string){
    let obj:any = {
      perfil:perfil2
    }
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/usuario/traerTodosPorPerfil",obj,token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public GuardarNuevo(token:string,usuario:any){
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/usuario/alta",usuario,token)
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
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/usuario/modificacion",usuario,token)
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
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/usuario/baja",obj,token)
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
