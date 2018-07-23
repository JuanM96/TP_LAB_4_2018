import { Component, OnInit } from '@angular/core';
import { MiHttpService } from '../../servicios/mi-http.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public theme = 'dark';
  public size = 'normal';
  public lang = 'es';
  public type= 'image';
  public captchaSuccess:boolean;
  public captchaResponse:string;
  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  sexos: string[] = ['Masculino', 'Femenino'];
  usuarioLogIn:any={
    usuario:"",
    password:""
  }
  usuarioSignUp:any={
    nombre:"",
    sexo:"",
    usuario:"",
    password:"",
    perfil:"cliente",
    habilitado:1,
    idVehiculo:0,
    estado:"Habilitado"
  }
  constructor(public miHttp:MiHttpService,private route: ActivatedRoute,private router: Router,public snackBar: MatSnackBar) {
    this.captchaSuccess = false;
    }

  ngOnInit() {
  }
  LogIn(){
    console.log(JSON.stringify(this.usuarioLogIn));
    this.miHttp.httpPostPromise("http://localhost"/*:8080*/+"/apiRestRemis/ingreso/logIn",this.usuarioLogIn)
    .then(datos => {
      //console.info(datos);
      console.log(JSON.stringify(datos));
      if (datos['logIn']) {
        localStorage.setItem("token",datos["token"]);
        localStorage.setItem("usuario",datos["usuario"]["usuario"]);
        localStorage.setItem("nombre",datos["usuario"]["nombre"]);
        localStorage.setItem("perfil",datos["usuario"]["perfil"]);
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/Remiseria']);
      }
      else{
        console.log(datos);
        this.openSnackBar("ERROR, Usuario o Contraseña Incorrectos");
      }
    })
    .catch(error => {console.log(error)});
  }
  SignUp(){
    if (this.usuarioSignUp.nombre != "" && this.usuarioSignUp.sexo != "" && this.usuarioSignUp.usuario != "" && this.usuarioSignUp.password != "") {
      this.miHttp.httpPostPromise("http://localhost"/*:8080*/+"/apiRestRemis/ingreso/registro",this.usuarioSignUp)
      .then(datos => {
        console.log(JSON.stringify(datos));
        this.openSnackBar(datos["respuesta"]);
      })
      .catch(error => {console.log(error)});
    }
    else{
      this.openSnackBar("ERROR,No deje campos vacios");
    }
    
  }
  LogInTest(perfil:string){
    switch (perfil) {
      case "admin":
        this.usuarioLogIn.usuario = "admin";
        this.usuarioLogIn.password = "123";
        this.LogIn();
        break;
      case "cliente":
        this.usuarioLogIn.usuario = "juanik";
        this.usuarioLogIn.password = "123";
        this.LogIn();
        break;
      case "chofer":
        this.usuarioLogIn.usuario = "garrot2";
        this.usuarioLogIn.password = "123";
        this.LogIn();
        break;
      default:
        break;
    }
    
  }
  openSnackBar(msg:string) {
    this.snackBar.open(msg,'OK',{duration:3000});
    /*this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 500,
    });*/
  }

  handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
  }

  handleLoad(): void {
    console.log("Captcha Cargo Correctamente");
  }

  handleExpire(): void {
    console.log("Captcha Expiro");
    this.openSnackBar("Captcha Expirado");
    this.captchaSuccess = false;
  }
}