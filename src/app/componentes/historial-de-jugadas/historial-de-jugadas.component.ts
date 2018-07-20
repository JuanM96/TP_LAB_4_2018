import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-historial-de-jugadas',
  templateUrl: './historial-de-jugadas.component.html',
  styleUrls: ['./historial-de-jugadas.component.css']
})
export class HistorialDeJugadasComponent implements OnInit {
  listado:any;
  constructor(public historial:JuegoServiceService) { }
  settings = {
    mode:'in-line',
    columns: {
      juego: {
        title: 'Juego'
      },
      nombreUsuario: {
        title: 'Jugador'
      },
      resultado: {
        title: 'Resultado'
      }
    },
    actions:{
      edit:false,
      add:false,
      delete:false
    }
  };
  ngOnInit() {
    this.TraerJugadas();
  }
  TraerJugadas(){
    this.historial.TraerLista();
    this.listado = this.historial.listado;
  }
  Actualizar(){
    this.TraerJugadas()
  }

}
