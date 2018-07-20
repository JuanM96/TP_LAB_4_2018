import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama'
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  respuesta:string;
  ocultar:boolean;
  miJuego:JuegoAnagrama;
  solucion:string;
  constructor(public historial:JuegoServiceService) { }

  ngOnInit() {
    this.miJuego = new JuegoAnagrama;
    this.ocultar = true;
  }
  verificar(){
    this.miJuego.Verificar(this.respuesta);
    this.ocultar = false;
    this.GuardarJugada();
  }
  nuevoJuego(){
    this.miJuego.NuevoJuego();
    this.ocultar = true;
    this.respuesta = "";
    this.solucion = this.miJuego.palabraSecreta;
  }
  GuardarJugada(){
    let jugada:any = {
      nombreUsuario: localStorage.getItem('usuario'),
      juego: this.miJuego.nombre,
      resultado: ""
    };
    if (this.miJuego.gano) {
      jugada.resultado = "Gano";
    }
    else{
      jugada.resultado = "Perdio";
    }
    this.historial.GuardarJuego(jugada);
  }
}
