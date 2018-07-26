import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

@Injectable()
export class EncuestaServiceService {
  //url:string = "https://juanmurciautn.000webhostapp.com";
  url:string = "http://localhost";
  constructor(public miHttp:MiHttpService) { }
  public traerListaCompleta(token:string){
    return this.miHttp.httpGetPromise(this.url /*:8080*/+"/apiRestRemis/encuesta/traerTodos",token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public GuardarNuevo(token:string,encuesta:any){
    return this.miHttp.httpPostPromiseWithToken(this.url /*:8080*/+"/apiRestRemis/encuesta/alta",encuesta,token)
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
