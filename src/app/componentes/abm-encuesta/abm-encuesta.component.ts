import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { VisorViajesComponent } from '../visor-viajes/visor-viajes.component';
import { ViajeServiceService } from '../../servicios/viaje-service.service';
import { EncuestaServiceService } from '../../servicios/encuesta-service.service';
export interface DialogData {
  idViaje: number;
}

@Component({
  selector: 'app-abm-encuesta',
  templateUrl: './abm-encuesta.component.html',
  styleUrls: ['./abm-encuesta.component.css']
})
export class AbmEncuestaComponent implements OnInit {
  premium:boolean;
  viajeSatis:number;
  encuesta = {
    nombre:"",
    pregunta1:"¿Como le parecio el estado del vehiculo?",
    respuesta1:"",
    pregunta2:"¿Como Calificaria El Servicio?",
    respuesta2:"",
    pregunta3:"¿Del 1 al 5 que tan satisfactorio fue el viaje?",
    respuesta3:"",
  }
  constructor(public snackBar:MatSnackBar,public dialogRef: MatDialogRef<VisorViajesComponent>,public encuestaService:EncuestaServiceService,public viajeService:ViajeServiceService,@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.premium = false;
   }

  ngOnInit() {
  }
  closeDialog(){
    if (this.encuesta.respuesta1 != "" && this.encuesta.respuesta3 != "" ) {
      if (this.encuesta.nombre == "") {
        this.encuesta.nombre = "Sin Nombre"
      }
      if (this.encuesta.respuesta2 == "") {
        this.encuesta.respuesta2 = "No Premium";
      }
      console.info(this.encuesta);
      this.encuestaService.GuardarNuevo(localStorage.getItem('token'),this.encuesta).then(datos =>{
        console.info(datos);
        this.openSnackBar(datos.respuesta);
        this.viajeService.realizarEncuesta(localStorage.getItem('token'),this.data.idViaje).then(datos =>{
          console.log("ID " + this.data.idViaje);
          this.dialogRef.close(datos);
        });
      })
    }
    else{
      this.openSnackBar("ERROR,Rellena Todos los Campos Obligatorios");
    }
    
    
  }
  openSnackBar(msg:string) {
    this.snackBar.open(msg,'OK',{duration:3000});
    /*this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 500,
    });*/
  }
}
