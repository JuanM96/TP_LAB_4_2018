import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AdivinaElNumeroComponent } from './componentes/adivina-el-numero/adivina-el-numero.component';
//  import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// import { AccordionModule } from 'ngx-bootstrap';
// agrego las clases para utilizar ruteo
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './componentes/error/error.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { RuteandoModule } from './ruteando/ruteando.module';
// declaro donde quiero que se dirija
/*
const MiRuteo = [{path: 'error' , component: ErrorComponent},
{path: 'Login' , component: LoginComponent},
{path: 'Principal' , component: PrincipalComponent , pathMatch: 'full'},
{path: 'Adivina' , component: AdivinaElNumeroComponent},
{path: 'AdivinaMasListado' , component: AdivinaMasListadoComponent},
{path: 'AgilidadaMasListado' , component: AgilidadMasListadoComponent},
{path: 'Agilidad' , component: AgilidadAritmeticaComponent},
{path: '' , component: LoginComponent , pathMatch: 'full'},

{path: '**' , component: ErrorComponent} ];
*/

import { JuegoServiceService } from './servicios/juego-service.service';
import { MiHttpService } from './servicios/mi-http.service';
import { HttpModule } from '@angular/http';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { MenuCardComponent } from './componentes/menu-card/menu-card.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule,MatSelectModule,MatInputModule,MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormField, MatFormFieldModule, MatSliderChange, MatSliderModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatSpinner} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import { PiedraPapelTijeraComponent } from './componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { TicTacToeComponent } from './componentes/tic-tac-toe/tic-tac-toe.component';
import { HistorialDeJugadasComponent } from './componentes/historial-de-jugadas/historial-de-jugadas.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AbmChoferesComponent } from './componentes/abm-choferes/abm-choferes.component';
import { UsuarioServiceService } from './servicios/usuario-service.service';
import { AbmClientesComponent } from './componentes/abm-clientes/abm-clientes.component';
import { AbmVehiculosComponent } from './componentes/abm-vehiculos/abm-vehiculos.component';
import { AbmViajesComponent } from './componentes/abm-viajes/abm-viajes.component';
import { ViajeServiceService } from './servicios/viaje-service.service';
import { VehiculoServiceService } from './servicios/vehiculo-service.service';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { VisorViajesComponent } from './componentes/visor-viajes/visor-viajes.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AbmEncuestaComponent } from './componentes/abm-encuesta/abm-encuesta.component';
import { AsignarModalComponent } from './componentes/asignar-modal/asignar-modal.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { ChartsModule } from 'ng2-charts';
import { EncuestaServiceService } from './servicios/encuesta-service.service';
import { AmazingTimePickerModule } from 'amazing-time-picker'; // this line you need
import { ArchivoServiceService } from './servicios/archivo-service.service';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { PdfpreviewComponent } from './componentes/pdfpreview/pdfpreview.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FinalizarViajeModalComponent } from './componentes/finalizar-viaje-modal/finalizar-viaje-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    AdivinaElNumeroComponent,
    ErrorComponent,
    PrincipalComponent,
    AgilidadAritmeticaComponent,
    MenuComponent,
    JuegosComponent,
    MenuCardComponent,
    CabeceraComponent,
    QuienSoyComponent,
    AnagramaComponent,
    PiedraPapelTijeraComponent,
    TicTacToeComponent,
    HistorialDeJugadasComponent,
    AbmChoferesComponent,
    AbmClientesComponent,
    AbmVehiculosComponent,
    AbmViajesComponent,
    VisorViajesComponent,
    AbmEncuestaComponent,
    AsignarModalComponent,
    EstadisticasComponent,
    PdfpreviewComponent,
    FinalizarViajeModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuteandoModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    HttpModule,
    MatSidenavModule,
    Ng2SmartTableModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule, 
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyAKjO3Geo8sXZrg7CQNXPyTpj4_zA1qDzg",
      libraries: ["places","geometry"]
    }),
    AgmDirectionModule,
    AmazingTimePickerModule,
    NgxCaptchaModule.forRoot({
      reCaptcha2SiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // optional, can be overridden with 'siteKey' component property
    }),
    MatSliderModule,
    ChartsModule,
    PDFExportModule,
    CollapseModule
    // NgbModule.forRoot(MiRuteo),
    // importo el ruteo
    // RouterModule.forRoot(MiRuteo)
  ],
  providers: [JuegoServiceService,MiHttpService,UsuarioServiceService,ViajeServiceService,VehiculoServiceService,EncuestaServiceService,ArchivoServiceService],
  bootstrap: [AppComponent],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
