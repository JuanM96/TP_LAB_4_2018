import { Injectable } from '@angular/core';
import { Juego } from '../clases/juego';
import { JuegoAdivina } from '../clases/juego-adivina';
import {MiHttpService} from './mi-http.service';
@Injectable()
export class JuegoServiceService {
  listado:any;
  constructor(public miHttp:MiHttpService) { }

  public TraerLista(){
   /* this.miHttp.httpGetPromise("http://localhost/apirestSalaDeJuegos/apirestjugadores/ranking/traerTodos")
    .then(datos => {
      //console.info(datos)
      this.listado = datos;
      console.info(this.listado);
    })
    .catch(error => {console.log(error)});*/
    if (localStorage.getItem('lista') != "") {
      this.listado = JSON.parse(localStorage.getItem('lista'));
      console.info(JSON.parse(localStorage.getItem('lista')));
    }
    else{
      alert("NO HAY JUEGOS GUARDADOS");
    }
  }
  public GuardarJuego(juego:any){
    /*this.miHttp.httpPostPromise("http://localhost/apirestSalaDeJuegos/apirestjugadores/ranking/alta",juego)
    .then(datos => {
      console.log(JSON.stringify(datos));
    })
    .catch(error => {console.log(error)});  */  
    let lista:any = localStorage.getItem('lista');
    let listado:Array<any> = new Array<any>();
    if (lista != "" && lista != null) {
    lista = JSON.parse(lista);
      for (var i = 0; i < lista.length; i++) {
        var element = lista[i];
        listado.push(element);
      }
      listado.push(juego);
      localStorage.setItem('lista',JSON.stringify(listado));
    }
    else{
      localStorage.setItem('lista',JSON.stringify(juego));
    }
  }
  /*public listar(): Array<Juego> {

    let miArray: Array<Juego> = new Array<Juego>();
 
    miArray.push(new JuegoAdivina("Juego 1", false));
    miArray.push(new JuegoAdivina("Pepe", true));
    miArray.push(new JuegoAdivina("Juego 3", false));
    miArray.push(new JuegoAdivina("Juego 4", false));
    miArray.push(new JuegoAdivina("Juego 5", false));
    miArray.push(new JuegoAdivina("Juego 6", false));
    return miArray;
  }

  public listarPromesa(): Promise<Array<Juego>> {
    let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
      let miArray: Array<Juego> = new Array<Juego>();
      miArray.push(new JuegoAdivina("JuegoPromesa 1", false,"promesa"));
      miArray.push(new JuegoAdivina("PepePromesa", true));
      miArray.push(new JuegoAdivina("JuegoPromesa 3", false));
      miArray.push(new JuegoAdivina("JuegoPromesa 4", false));
      miArray.push(new JuegoAdivina("JuegoPromesa 5", false));
      miArray.push(new JuegoAdivina("JuegoPromesa 6", false));
      resolve(miArray);
    });

    return promesa;
  }*/


}
