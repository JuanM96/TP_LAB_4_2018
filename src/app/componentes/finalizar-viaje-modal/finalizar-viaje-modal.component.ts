import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { VisorViajesComponent } from '../visor-viajes/visor-viajes.component';
import { ViajeServiceService } from '../../servicios/viaje-service.service';
import { UsuarioServiceService } from '../../servicios/usuario-service.service';
import { VehiculoServiceService } from '../../servicios/vehiculo-service.service';
export interface DialogAsig{
  idViaje: number;
  monto:number;
}
@Component({
  selector: 'app-finalizar-viaje-modal',
  templateUrl: './finalizar-viaje-modal.component.html',
  styleUrls: ['./finalizar-viaje-modal.component.css']
})
export class FinalizarViajeModalComponent implements OnInit {
  montoIng : number;
  montoAprox:number;
  constructor(public snackBar:MatSnackBar,public dialogRef: MatDialogRef<VisorViajesComponent>,public viajeService:ViajeServiceService,public usuarioService:UsuarioServiceService,public vehiculoService:VehiculoServiceService ,@Inject(MAT_DIALOG_DATA) public data: DialogAsig) { }

  ngOnInit() {
    this.montoAprox = this.data.monto;
  }
  openSnackBar(msg:string) {
    this.snackBar.open(msg,'OK',{duration:3000});
    /*this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 500,
    });*/
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  aceptar(){
    console.log(this.montoIng);
    console.info(this.data);
    console.log(this.data.idViaje);
    console.log(this.data.monto);
    if (this.montoIng != null && this.montoIng != undefined) {
      this.viajeService.FinalizarViaje(localStorage.getItem('token'),this.data.idViaje,this.montoIng).then(datos =>{
        console.info(datos);
        this.openSnackBar(datos.respuesta);
        this.dialogRef.close();
      })
    }
    else{
      this.openSnackBar("Ingrese Un Monto");
    }
    
  }
}
