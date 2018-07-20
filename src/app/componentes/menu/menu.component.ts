import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
          this.router.navigate(['/Remiseria/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Remiseria/Agilidad']);
        break;
      case 'Anagrama':
          this.router.navigate(['/Remiseria/Anagrama']);
        break;
      case 'AgilidadaMasListado':
          this.router.navigate(['/Remiseria/AgilidadaMasListado']);
        break;
      case 'PiedraPapelTijera':
          this.router.navigate(['/Remiseria/PiedraPapelTijera']);
      break;
      case 'TicTacToe':
          this.router.navigate(['/Remiseria/TicTacToe']);
      break;
      case 'Historial':
          this.router.navigate(['/Remiseria/Historial']);
      break;
      case 'QuienSoy':
          this.router.navigate(['/Remiseria/QuienSoy']);
      break;
    }
  }
  Salir(){
    localStorage.setItem('token',"");
    localStorage.setItem('usuario',"");
    this.router.navigate(["/"]);
  }
  
}
