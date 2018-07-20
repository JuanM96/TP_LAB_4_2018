import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {
  nombre:string;
  constructor(private route: ActivatedRoute,
    private router: Router) {
      this.nombre = localStorage.getItem("nombre");
     }


  ngOnInit() {
  }
  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'Anagrama':
          this.router.navigate(['/Juegos/Anagrama']);
        break;
      case 'AgilidadaMasListado':
          this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
      case 'PiedraPapelTijera':
          this.router.navigate(['/Juegos/PiedraPapelTijera']);
      break;
      case 'TicTacToe':
          this.router.navigate(['/Juegos/TicTacToe']);
      break;
    }
  }
}
