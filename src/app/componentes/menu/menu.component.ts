import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AbmViajesComponent } from '../abm-viajes/abm-viajes.component';
import { MatDialog, MatSnackBar } from '../../../../node_modules/@angular/material';
import { UsuarioServiceService } from '../../servicios/usuario-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isCollapsed:boolean = true;
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
  perfil:string;
  estado:string;
  constructor(private route: ActivatedRoute,
    private router: Router,public dialog: MatDialog,public usuarioServie:UsuarioServiceService,public snackBar:MatSnackBar) {
      this.perfil = localStorage.getItem('perfil');
      this.estado = localStorage.getItem('estado');
     }

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
  empezarATrabajar(){
    this.usuarioServie.ponerATrabajar(localStorage.getItem('token'),parseInt(localStorage.getItem('id'))).then(datos =>{
      console.info(datos);
      this.openSnackBar(datos.respuesta);
      localStorage.setItem('estado','Trabajando');
      this.estado = localStorage.getItem('estado');
    })
  }
  dejarDeTrabajar(){
    this.usuarioServie.dejarDeTrabajar(localStorage.getItem('token'),parseInt(localStorage.getItem('id'))).then(datos =>{
      console.info(datos);
      this.openSnackBar(datos.respuesta);
      localStorage.setItem('estado','En Casa');
      this.estado = localStorage.getItem('estado');
    })
  }
  openSnackBar(msg:string) {
    this.snackBar.open(msg,'OK',{duration:3000});
    /*this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 500,
    });*/
  }
}
