import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { ViajeServiceService } from '../../servicios/viaje-service.service';
import { VehiculoServiceService } from '../../servicios/vehiculo-service.service';
//import { DialogAsig } from '../asignar-modal/asignar-modal.component';
export interface DialogAsig{
  imprimir:string;
}
@Component({
  selector: 'app-pdfpreview',
  templateUrl: './pdfpreview.component.html',
  styleUrls: ['./pdfpreview.component.css']
})
export class PdfpreviewComponent implements OnInit {
  listado:any;
  
  constructor(public dialogRef: MatDialogRef<EstadisticasComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogAsig,public viajeService:VehiculoServiceService) {
    this.viajeService.traerListaCompleta(localStorage.getItem('token')).then(datos =>{
      console.info(datos);
      this.listado = datos;
    })
   }

  ngOnInit() {
  }

}
