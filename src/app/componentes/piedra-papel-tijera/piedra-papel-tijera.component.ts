import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera'
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {
  respuesta:number;
  miJuego:JuegoPiedraPapelTijera;
  constructor(public historial:JuegoServiceService) { }

  ngOnInit() {
    this.miJuego = new JuegoPiedraPapelTijera;
  }
  nuevoJuego(){
    this.miJuego.NuevoJuego();
    this.respuesta = 0;
  }
  verificar(res){
    this.miJuego.Verificar(res);
    this.respuesta = res;
    this.GuardarJugada();
  }
  GuardarJugada(){
    let jugada:any = {
      nombreUsuario: localStorage.getItem('usuario'),
      juego: this.miJuego.nombre,
      resultado: this.miJuego.resultado
    };
    if (this.miJuego.resultado == "Ganaste") {
      jugada.resultado = "Gano";
    }
    else if(this.miJuego.resultado == "Perdiste"){
      jugada.resultado = "Perdio";
    }
    else{
      jugada.resultado = "Empato";
    }
    this.historial.GuardarJuego(jugada);
  }
}
