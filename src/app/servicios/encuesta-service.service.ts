import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';

@Injectable()
export class EncuestaServiceService {

  constructor(public miHttp:MiHttpService) { }
  public traerListaCompleta(token:string){
    return this.miHttp.httpGetPromise("http://localhost"/*:8080*/+"/apiRestRemis/encuesta/traerTodos",token)
    .then(datos => {
      return datos;
    })
    .catch(error =>{
      return error;
    })
  }
  public GuardarNuevo(token:string,encuesta:any){
    return this.miHttp.httpPostPromiseWithToken("http://localhost"/*:8080*/+"/apiRestRemis/encuesta/alta",encuesta,token)
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
