import { Component, OnInit } from '@angular/core';
import { ViajeServiceService } from '../../servicios/viaje-service.service';
import { EncuestaServiceService } from '../../servicios/encuesta-service.service';
import { ArchivoServiceService } from '../../servicios/archivo-service.service';
import * as jspdf from 'jspdf';  
import * as html2canvas from 'html2canvas';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { PdfpreviewComponent } from '../pdfpreview/pdfpreview.component';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public graficoViajesLabels:string[] = ['Viajes Finalizados', 'Viajes Pendientes', 'Viajes Cancelados', 'Viajes En Curso'];
  public graficoViajesData:number[] = [0, 0, 0, 0];
  public graficoViajesType:string = 'doughnut';
  public graficoEncuestasLabels1:string[] = ['Limpio', 'Regular', 'Sucio'];
  public graficoEncuestasData1:number[] = [0, 0, 0];
  public graficoEncuestasLabels2:string[] = ['Bueno', 'Regular', 'Malo'];
  public graficoEncuestasData2:number[] = [0, 0, 0];
  public graficoEncuestasLabels3:string[] = ['1', '2', '3', '4', '5'];
  public graficoEncuestasData3:number[] = [0, 0, 0, 0, 0];
  public graficoEncuestasType:string = 'doughnut';
  pregunta1:string = "¿Como le parecio el estado del vehiculo?";
  pregunta2:string = "¿Como Calificaria El Servicio Premium?";
  pregunta3:string = "¿Del 1 al 5 que tan satisfactorio fue el viaje?";
  listadoViajes:any;
  listadoEncuestas:any;
  preguntaNro:string = 'Pregunta 1';
  viajesCant:number = 5;
  mostrar:boolean = false;
  mostrarEnc:boolean = false;
  dataViajes: any = [{
    CantidadViajesTotal: 0,
    CantidadViajesFinalizados: 0,
    CantidadViajesPendientes: 0,
    CantidadViajesCancelados: 0,
    CantidadViajesEnCurso: 0,
  }];
  dataEncuesta: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];
  constructor(public viajesService:ViajeServiceService,public encuestaService:EncuestaServiceService,public archivoService:ArchivoServiceService,public dialog:MatDialog) {
    
   }

  ngOnInit() {
    this.viajesService.traerListaCompleta(localStorage.getItem('token')).then(datosViajes =>{
      console.info(datosViajes);
      this.listadoViajes = datosViajes;
      this.actualizarConteoViajes();
    })
    this.encuestaService.traerListaCompleta(localStorage.getItem('token')).then(datosEncuestas =>{
      console.info(datosEncuestas);
      this.listadoEncuestas = datosEncuestas;
      this.actualizarConteoEncuestas(this.preguntaNro);
    })
  }
    // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }
  actualizarConteoViajes(){
    this.viajesCant = this.listadoViajes.length;
    this.listadoViajes.forEach(viaje => {
      if (viaje.estado == "Finalizado") {
        this.graficoViajesData[0] = this.graficoViajesData[0] + 1;
      }
      else if (viaje.estado == "Pendiente") {
        this.graficoViajesData[1] = this.graficoViajesData[1] + 1;
      }
      else if (viaje.estado == "Cancelado") {
        this.graficoViajesData[2] = this.graficoViajesData[2] + 1;
      }
      else if (viaje.estado == "En Viaje") {
        this.graficoViajesData[3] = this.graficoViajesData[3] + 1;
      }
    });
    console.info(this.graficoViajesData);
    this.mostrar = true;
  }
  actualizarConteoEncuestas(pregunta:string){
    switch (pregunta) {
      case 'Pregunta 1':
        this.graficoEncuestasData1 = [0, 0, 0];
        this.listadoEncuestas.forEach(encuesta => {
          if (encuesta.respuesta1 == "Limpio") {
            this.graficoEncuestasData1[0] = this.graficoEncuestasData1[0] + 1;
          }
          else if (encuesta.respuesta1 == "Regular") {
            this.graficoEncuestasData1[1] = this.graficoEncuestasData1[1] + 1;
          }
          else if (encuesta.respuesta1 == "Sucio") {
            this.graficoEncuestasData1[2] = this.graficoEncuestasData1[2] + 1;
          }
        });
        console.info(this.graficoEncuestasData1);
        break;
      case 'Pregunta 2':
      this.graficoEncuestasData2 = [0, 0, 0];
      this.listadoEncuestas.forEach(encuesta => {
        if (encuesta.respuesta2 == "Bueno") {
          this.graficoEncuestasData2[0] = this.graficoEncuestasData2[0] + 1;
        }
        else if (encuesta.respuesta2 == "Regular") {
          this.graficoEncuestasData2[1] = this.graficoEncuestasData2[1] + 1;
        }
        else if (encuesta.respuesta2 == "Malo") {
          this.graficoEncuestasData2[2] = this.graficoEncuestasData2[2] + 1;
        }
      });
      console.info(this.graficoEncuestasData2);
        break;
      case 'Pregunta 3':
        this.graficoEncuestasData3 = [0, 0, 0, 0, 0];
        this.listadoEncuestas.forEach(encuesta => {
          if (encuesta.respuesta3 == '1') {
            this.graficoEncuestasData3[0] = this.graficoEncuestasData3[0] + 1;
          }
          else if (encuesta.respuesta3 == '2') {
            this.graficoEncuestasData3[1] = this.graficoEncuestasData3[1] + 1;
          }
          else if (encuesta.respuesta3 == '3') {
            this.graficoEncuestasData3[2] = this.graficoEncuestasData3[2] + 1;
          }
          else if (encuesta.respuesta3 == '4') {
            this.graficoEncuestasData3[3] = this.graficoEncuestasData3[3] + 1;
          }
          else if (encuesta.respuesta3 == '5') {
            this.graficoEncuestasData3[4] = this.graficoEncuestasData3[4] + 1;
          }
        });
        console.info(this.graficoEncuestasData1);
        break;
      default:
        break;
    }
    this.mostrarEnc = true;
  }
  exportarExcelViajes() :void{
    this.archivoService.exportAsExcelFile(this.listadoViajes, 'EstadisticasDeViajes');
  }
  exportarExcelEncuestas() :void{
    this.archivoService.exportAsExcelFile(this.listadoEncuestas, 'EstadisticasDeEncuestas');
  }

}

