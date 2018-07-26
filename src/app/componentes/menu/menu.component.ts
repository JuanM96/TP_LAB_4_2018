import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AbmViajesComponent } from '../abm-viajes/abm-viajes.component';
import { MatDialog } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  viaje = {
    origenLat: 0,
    origenLong: 0,
    destinoLat: 0,
    destinoLong: 0,
    cliente: "",
    fecha: 0,
    monto: 0,
    idChofer: 0,
    idVehiculo: 0,
    estado: ""
  }
  viajeAGuardar = {
    origenLat: 0,
    origenLong: 0,
    destinoLat: 0,
    destinoLong: 0,
    cliente: "",
    fecha: 0,
    monto: 0,
    idChofer: 0,
    idVehiculo: 0,
    estado: ""
  }
  constructor(private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog) { }

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
  openDialog(): void {
    const dialogRef = this.dialog.open(AbmViajesComponent, {
      width: '600px',
      data: this.viaje
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.info(this.viajeAGuardar);
      this.viajeAGuardar = result;
    });
  }
  Salir(){
    localStorage.setItem('token',"");
    localStorage.setItem('usuario',"");
    this.router.navigate(["/"]);
  }
  
}
