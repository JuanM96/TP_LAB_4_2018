import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../../node_modules/@angular/material';
import { VisorViajesComponent } from '../visor-viajes/visor-viajes.component';

@Component({
  selector: 'app-abm-encuesta',
  templateUrl: './abm-encuesta.component.html',
  styleUrls: ['./abm-encuesta.component.css']
})
export class AbmEncuestaComponent implements OnInit {
  premium:boolean;
  viajeSatis:number;
  constructor(public dialogRef: MatDialogRef<VisorViajesComponent>) {
    this.premium = false;
   }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
