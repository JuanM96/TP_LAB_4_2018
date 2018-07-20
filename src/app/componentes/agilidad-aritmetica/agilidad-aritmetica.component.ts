import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'
import { JuegoServiceService } from '../../servicios/juego-service.service';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  respuesta:number;
  private subscription: Subscription;
  ngOnInit() {
  }
   constructor(public historial:JuegoServiceService) {
    this.ocultarVerificar=true;
    this.Tiempo=15; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");  
  }
  NuevoJuego() {
    this.nuevoJuego.NuevoJuego();
   this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        this.nuevoJuego.gano = false;
        this.GuardarJugada()
        clearInterval(this.repetidor);
        
        this.Tiempo=15;
        this.nuevoJuego.juegoEmpezado = false;
        this.ocultarVerificar = false;
        this.respuesta = null;
      }
      }, 900);
    console.log(this.nuevoJuego.resultado);
    this.ocultarVerificar = true;

  }
  verificar()
  {
    if(this.nuevoJuego.Verificar(this.respuesta)){
      this.ocultarVerificar=false;
      clearInterval(this.repetidor);
      this.Tiempo=15;
      this.GuardarJugada();
      this.respuesta = null;
    }
  }
  GuardarJugada(){
    let jugada:any = {
      nombreUsuario: "admin"/*localStorage.getItem('usuario')*/,
      juego: this.nuevoJuego.nombre,
      resultado: this.nuevoJuego.gano
    };
    if (this.nuevoJuego.gano) {
      jugada.resultado = "Gano";
    }
    else{
      jugada.resultado = "Perdio";
    }
    this.historial.GuardarJuego(jugada);
    console.info(jugada);
  }
}
