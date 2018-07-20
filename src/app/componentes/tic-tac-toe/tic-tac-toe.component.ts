import { Component, OnInit } from '@angular/core';
import { JuegoTicTacToe } from '../../clases/juego-tic-tac-toe'
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  casillas:number[] = [
    0,0,0,
    0,0,0,
    0,0,0
  ]
  miJuego:JuegoTicTacToe;
  resultado:string;
  ocultar:boolean = true;
  constructor(public historial:JuegoServiceService) { }

  ngOnInit() {
    this.miJuego = new JuegoTicTacToe;
  }
  nuevoJuego(){
    this.casillasA0();
    this.miJuego.NuevoJuego();
    this.ocultar = true;
  }
  verificar(lugar){
    if (!this.miJuego.gano) {
      this.cambiarCasilla(lugar);
      this.miJuego.TurnoJugado(lugar);
      this.resultado = this.miJuego.Verificar();
      if (this.resultado != "Nadie") {
        this.ocultar = false;
        this.GuardarJugada();
      }
    }
    
  }
  casillasA0(){
    for (var i = 0; i < this.casillas.length; i++) {
      this.casillas[i]=0;
    }
  }
  cambiarCasilla(lugar){
    this.casillas[lugar] = this.miJuego.turno;
  }
  GuardarJugada(){
    let jugada:any = {
      nombreUsuario: localStorage.getItem('usuario'),
      juego: this.miJuego.nombre,
      resultado: this.resultado
    };
    if (this.resultado == "Jugador 1 GANA!") {
      jugada.resultado = "Gano";
    }
    else if(this.resultado == "Jugador 2 GANA!"){
      jugada.resultado = "Perdio";
    }
    else{
      jugada.resultado = "Empato";
    }
    this.historial.GuardarJuego(jugada);
  }
}
