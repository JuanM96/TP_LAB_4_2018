import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import {MatCardModule,MatSelectModule,MatInputModule,MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import { PiedraPapelTijeraComponent } from './componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { TicTacToeComponent } from './componentes/tic-tac-toe/tic-tac-toe.component';
import { HistorialDeJugadasComponent } from './componentes/historial-de-jugadas/historial-de-jugadas.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AbmChoferesComponent } from './componentes/abm-choferes/abm-choferes.component';
import { UsuarioServiceService } from './servicios/usuario-service.service';

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
    AbmChoferesComponent
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
    MatRadioModule
    // NgbModule.forRoot(MiRuteo),
    // importo el ruteo
    // RouterModule.forRoot(MiRuteo)
  ],
  providers: [JuegoServiceService,MiHttpService,UsuarioServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
