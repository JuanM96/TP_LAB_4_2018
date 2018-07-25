import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { VisorViajesComponent } from '../visor-viajes/visor-viajes.component';
import { ViajeServiceService } from '../../servicios/viaje-service.service';
import { UsuarioServiceService } from '../../servicios/usuario-service.service';
import { VehiculoServiceService } from '../../servicios/vehiculo-service.service';
export interface DialogAsig{
  idViaje: number;
  asignar:string;
}

@Component({
  selector: 'app-asignar-modal',
  templateUrl: './asignar-modal.component.html',
  styleUrls: ['./asignar-modal.component.css']
})
export class AsignarModalComponent implements OnInit {
  listado:any;
  asignar:string;
  selectedId:number;
  idViaje:number;
  constructor(public snackBar:MatSnackBar,public dialogRef: MatDialogRef<VisorViajesComponent>,public viajeService:ViajeServiceService,public usuarioService:UsuarioServiceService,public vehiculoService:VehiculoServiceService ,@Inject(MAT_DIALOG_DATA) public data: DialogAsig) {
    console.info(this.data);
    this.asignar = this.data.asignar;
    this.idViaje = this.data.idViaje;
    if (this.data.asignar == "Chofer") {
      this.usuarioService.traerDisponibles(localStorage.getItem('token')).then(datos =>{
        console.info(datos);
        this.listado = datos;
      })
    }
    else if (this.data.asignar == "Vehiculo") {
      this.vehiculoService.traerDisponibles(localStorage.getItem('token')).then(datos =>{
        console.info(datos);
        this.listado = datos;
      })
    }
   }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  asignarAccion(){
    if (this.asignar == "Vehiculo") {
      console.log("idViaje = "+this.idViaje);
      console.log("selectedId = "+this.selectedId);
      this.viajeService.asignarVehiculo(localStorage.getItem('token'),this.idViaje,this.selectedId).then(datos => {
        console.info(datos);
        this.openSnackBar(datos.respuesta);
        this.dialogRef.close();
      })
    }
    else if (this.asignar == "Chofer") {
      this.viajeService.asignarChofer(localStorage.getItem('token'),this.idViaje,this.selectedId).then(datos => {
        console.info(datos);

        this.openSnackBar(datos.respuesta);
        this.dialogRef.close();
      })
    }
  }
  openSnackBar(msg:string) {
    this.snackBar.open(msg,'OK',{duration:3000});
    /*this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 500,
    });*/
  }
}
