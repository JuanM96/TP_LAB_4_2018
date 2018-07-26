import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { MenuComponent } from '../componentes/menu/menu.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { MenuCardComponent } from '../componentes/menu-card/menu-card.component';
import { CabeceraComponent } from '../componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component';
import { AnagramaComponent } from '../componentes/anagrama/anagrama.component';
import { HistorialDeJugadasComponent } from '../componentes/historial-de-jugadas/historial-de-jugadas.component';
import { PiedraPapelTijeraComponent } from '../componentes/piedra-papel-tijera/piedra-papel-tijera.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule,MatSelectModule,MatInputModule,MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSliderModule, MatSpinner} from '@angular/material';
import { TicTacToeComponent } from '../componentes/tic-tac-toe/tic-tac-toe.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AbmChoferesComponent } from '../componentes/abm-choferes/abm-choferes.component';
import { AbmVehiculosComponent } from '../componentes/abm-vehiculos/abm-vehiculos.component';
import { AbmViajesComponent } from '../componentes/abm-viajes/abm-viajes.component';
import { AbmClientesComponent } from '../componentes/abm-clientes/abm-clientes.component';
import { AgmCoreModule } from '@agm/core';
import { VisorViajesComponent } from '../componentes/visor-viajes/visor-viajes.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AgmDirectionModule } from '../../../node_modules/agm-direction';
import { NgxCaptchaModule } from '../../../node_modules/ngx-captcha';
import { AbmEncuestaComponent } from '../componentes/abm-encuesta/abm-encuesta.component';
import { AsignarModalComponent } from '../componentes/asignar-modal/asignar-modal.component';
import { ChartsModule } from '../../../node_modules/ng2-charts';
import { EstadisticasComponent } from '../componentes/estadisticas/estadisticas.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { PdfpreviewComponent } from '../componentes/pdfpreview/pdfpreview.component';
import { CollapseModule } from '../../../node_modules/ngx-bootstrap/collapse';
import { FinalizarViajeModalComponent } from '../componentes/finalizar-viaje-modal/finalizar-viaje-modal.component';
//import { PdfpreviewComponent } from './componentes/pdfpreview/pdfpreview.component';

// declaro donde quiero que se dirija
const MiRuteo = [
{path: '' , component: PrincipalComponent},
{path: 'Principal' , component: PrincipalComponent},
{ path: 'Remiseria' ,
component: JuegosComponent ,
children:
     [{path: '' , component: MenuCardComponent},
     {path: 'Adivina' , component: AdivinaElNumeroComponent},
      {path: 'Anagrama' , component: AnagramaComponent},
      {path: 'PiedraPapelTijera' , component: PiedraPapelTijeraComponent},
      {path: 'Agilidad' , component: AgilidadAritmeticaComponent},
      {path: 'TicTacToe' , component: TicTacToeComponent},
      {path: 'Historial' , component: HistorialDeJugadasComponent},
      {path: 'abmChoferes' , component: AbmChoferesComponent},
      {path: 'abmVehiculos' , component: AbmVehiculosComponent},
      {path: 'abmViajes' , component: AbmViajesComponent},
      {path: 'abmEncuesta' , component: AbmEncuestaComponent},
      {path: 'visorViajes' , component: VisorViajesComponent},
      {path: 'abmClientes' , component: AbmClientesComponent},
      {path: 'asignarModal' , component: AsignarModalComponent},
      {path: 'estadisticas' , component: EstadisticasComponent},
      {path: 'previewPdf' , component: PdfpreviewComponent},
      {path: 'finalizarViaje' , component: FinalizarViajeModalComponent},
      {path: 'QuienSoy' , component: QuienSoyComponent}]
},
{path: '**' , component: JuegosComponent},
{path: 'error' , component: JuegosComponent}];

@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    AgmCoreModule,
    AgmDirectionModule,
    NgxCaptchaModule,
    MatSliderModule,
    ChartsModule,
    PDFExportModule ,
    CollapseModule
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
