import { Component, OnInit, ElementRef, NgZone,ViewChild } from '@angular/core';
import { VehiculoServiceService } from '../../servicios/vehiculo-service.service';
import { Router } from '../../../../node_modules/@angular/router';
import { MatSnackBar, MatDialog, MatDialogRef } from '../../../../node_modules/@angular/material';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
//import { ListadoDeResultadosComponent } from '../../../../backup/listado-de-resultados/listado-de-resultados.component';
import { ViajeServiceService } from '../../servicios/viaje-service.service';
import { VisorViajesComponent } from '../visor-viajes/visor-viajes.component';
//declare var google:any;
@Component({
  selector: 'app-abm-viajes',
  templateUrl: './abm-viajes.component.html',
  styleUrls: ['./abm-viajes.component.css']
})
export class AbmViajesComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild('searchB')
  public searchElementRefB: ElementRef;
  @ViewChild('myDirection')
  public directionRef: ElementRef;

  public searchControl: FormControl;
  public dir = undefined;
  public activoAlternatives : Boolean = true;

    // AGREGAR EN LA BASE DE VIAJES
  public origenIngresado : string = "";
  public destinoIngresado : string = "";
  
  minDate = new Date(Date.now());
  maxDate = new Date(Date.now() + 31536000000);
  fechaSalida = new Date(Date.now()).toISOString();
  horaSalida = this.pad(this.minDate.getHours(),2) + ":" + this.pad(this.minDate.getMinutes(),2);
  title: string = 'My first AGM project';
  centerLat: number = -34.662435;
  centerLng: number = -58.364977;//-34.662435, -58.364977
  latA: number;
  lngA: number;//-34.662435, -58.364977
  latB: number;
  lngB: number;//-34.662435, -58.364977
  zoom:number;
  premium:boolean;
  montoAprox:number = 0;
  tiempoEstimado:number = 0;
  distanciaTotal:number = 0;
  viaje = {
    origenDir: "",
    origenLat: 0,
    origenLong: 0,
    destinoDir: "",
    destinoLat: 0,
    destinoLong: 0,
    fecha: "",
    hora: "",
    monto: 0,
    duracion: 0,
    distancia: 0,
    idCliente: 0,
    idVehiculo: 0,
    idChofer: 0,
    estado: "Pendiente",
    encuesta: 0
  }
  listado:any;
  constructor(public vehiculoService:VehiculoServiceService,public router:Router,public snackBar:MatSnackBar,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,public viajeService:ViajeServiceService,public dialogRef: MatDialogRef<VisorViajesComponent>) {
   }

  ngOnInit() {
    this.premium = false;
    //create search FormControl
    this.searchControl = new FormControl();
    //set current position
    this.setCurrentPosition("Centro");

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      let autocompleteB = new google.maps.places.Autocomplete(this.searchElementRefB.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          let placeB: google.maps.places.PlaceResult = autocompleteB.getPlace();
          //verify result
          if (place === null || (place != null && (place.geometry === undefined || place.geometry === null))) {
            return;
          }

          //set latitude, longitude and zoom
          if(place != null){
            this.latA = place.geometry.location.lat();
            this.lngA = place.geometry.location.lng();
          }

          this.zoom = 12;

          console.log(place);
          console.log(placeB);
          this.getDirection();

          console.log(this.origenIngresado);

          //this.getCenterCoords();
        });
      });
      autocompleteB.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          let placeB: google.maps.places.PlaceResult = autocompleteB.getPlace();
          //verify result
          if (placeB === null || (placeB != null && (placeB.geometry === undefined || placeB.geometry === null))) {
            return;
          }

          if(placeB != null){
            this.latB = placeB.geometry.location.lat();
            this.lngB = placeB.geometry.location.lng();
          }
          this.zoom = 12;
          this.getDirection();

          console.log(this.destinoIngresado);

          //this.getCenterCoords();
        });
      });
    });
    this.actualizarListado();
  }

  public changeDirectionHandler(event: any){
    console.info(event);
    // You can do anything.
    this.distanciaTotal = parseFloat(event.routes[0].legs[0].distance.value) / 1000;
    this.tiempoEstimado = parseFloat(event.routes[0].legs[0].duration.value) / 60;
    console.log("Distancia Total: " + this.distanciaTotal + "kms");
    console.log("Tiempo Total: " + this.tiempoEstimado + "mins");
    this.montoAprox = this.calcularMontoAprox();
  }

  private setCurrentPosition(modo : string) {
    if ("geolocation" in navigator) {
      
      navigator.geolocation.getCurrentPosition((position) => {
        let myGeocoder = new google.maps.Geocoder();
        if(modo == "Origen"){
          this.latA = position.coords.latitude;
          this.lngA = position.coords.longitude;
          let geocodeReq : google.maps.GeocoderRequest = {
            location : {
              lat: this.latA,
              lng : this.lngA
            }
          };
          myGeocoder.geocode(geocodeReq,(res,stat) => {
        
            if(stat == google.maps.GeocoderStatus.OK){
              (this.searchElementRef.nativeElement as HTMLInputElement).value = res[0].formatted_address;
              this.getDirection();
            }else{
              console.log("GEOCODER STATUS: " + stat);
            }
          });
        }else if(modo == "Destino"){
          this.latB = position.coords.latitude;
          this.lngB = position.coords.longitude;
          let geocodeReq : google.maps.GeocoderRequest = {
            location : {
              lat: this.latB,
              lng : this.lngB
            }
          };
          myGeocoder.geocode(geocodeReq,(res,stat) => {
        
            if(stat == google.maps.GeocoderStatus.OK){
              (this.searchElementRefB.nativeElement as HTMLInputElement).value = res[0].formatted_address;
              this.getDirection();
            }else{
              console.log("GEOCODER STATUS: " + stat);
            }
          });
        }else{
      
          this.centerLat = position.coords.latitude;
          this.centerLng = position.coords.longitude;
        }
        this.zoom = 10;
        //this.getCenterCoords();
      });
    }
  }
  actualizarListado(){
    this.vehiculoService.traerListaCompleta(localStorage.getItem("token")).then(datos => {
  
      if (datos.statusText == "Network Authentication Required") {
        this.openSnackBar("ERROR,Acceso Restringido Vuelva a Logear");
        this.Salir();
      }
      else{
        this.listado = datos;
        console.info(this.listado);
      }
    }).catch(error => {
      console.log(error);
    })
  }
  Salir(){
    localStorage.setItem('token',"");
    localStorage.setItem('usuario',"");
    this.router.navigate(["/"]);
  }
  openSnackBar(msg:string) {
    this.snackBar.open(msg,'OK',{duration:3000});
    /*this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 500,
    });*/
  }
  getDirection() {
    if (this.latA === null || this.latA === undefined || this.lngA === null || this.lngA === undefined || this.latB === null || this.latB === undefined || this.lngB === null || this.lngB === undefined) {
      return;
    }
    else{
      this.dir = {
        origin : '',
        destination : ''
      };
      this.dir.origin = { lat: this.latA, lng: this.lngA };
      this.dir.destination = { lat: this.latB, lng: this.lngB };
    }
  }

  getCenterCoords(){
    this.centerLat = this.latA + (this.latA - this.latB) / 2;
    this.centerLng = this.lngA + (this.lngA - this.lngB) / 2;
  }

  pad(num:number, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  aceptarViaje(){
    let auxFecha:Date = new Date();
    auxFecha.setTime(Date.parse(this.fechaSalida));
    this.viaje.origenDir = (this.searchElementRef.nativeElement as HTMLInputElement).value;
    this.viaje.origenLat = this.latA;
    this.viaje.origenLong = this.lngA;
    this.viaje.destinoDir = (this.searchElementRefB.nativeElement as HTMLInputElement).value;
    this.viaje.destinoLat = this.latB;
    this.viaje.destinoLong = this.lngB;
    this.viaje.fecha = auxFecha.getDate() + "/" + (auxFecha.getMonth()+1) + "/" + auxFecha.getFullYear();
    this.viaje.hora = this.horaSalida;
    this.viaje.monto = this.calcularMontoAprox();
    this.viaje.duracion = this.tiempoEstimado;
    this.viaje.distancia = this.distanciaTotal;
    this.viaje.idCliente = parseInt(localStorage.getItem('id'));
    if (!this.premium) {
      this.viaje.idVehiculo = this.listado[0].id; 
    }
    console.info(this.viaje);
    this.viajeService.GuardarNuevo(localStorage.getItem('token'),this.viaje).then(datos =>{
      console.info(datos._body);
      console.info(datos);
      this.openSnackBar(datos.respuesta);
      this.dialogRef.close();
    })
  }
  borrarCampos(){
    this.searchElementRef.nativeElement.value = "";
    this.searchElementRefB.nativeElement.value = "";
    this.fechaSalida = new Date(Date.now()).toISOString();
    this.horaSalida = this.pad(this.minDate.getHours(),2) + ":" + this.pad(this.minDate.getMinutes(),2);
    this.montoAprox = 0;
  }
  calcularMonto(){
    setTimeout(() => {
      this.montoAprox = this.calcularMontoAprox();      
    }, 100);
  }
  calcularMontoAprox() :number{
    let ret:number;
    if (this.premium) {
      ret = this.distanciaTotal * 45;
    }
    else{
      ret = this.distanciaTotal * 30;
    }
    return ret;
  }
  
}
