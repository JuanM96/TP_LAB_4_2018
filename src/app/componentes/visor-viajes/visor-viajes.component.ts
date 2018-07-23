import { Component, OnInit } from '@angular/core';
import { AbmEncuestaComponent } from '../abm-encuesta/abm-encuesta.component';
import { MatDialog } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-visor-viajes',
  templateUrl: './visor-viajes.component.html',
  styleUrls: ['./visor-viajes.component.css']
})
export class VisorViajesComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  idViaje = 1;
  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }
  realizarEncuesta(){
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AbmEncuestaComponent, {
      width: '400px',
      data: {idViaje:this.idViaje}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.info(result);
    });
  }
}
