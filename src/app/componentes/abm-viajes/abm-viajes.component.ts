import { Component, OnInit, ElementRef, NgZone,ViewChild } from '@angular/core';
import { VehiculoServiceService } from '../../servicios/vehiculo-service.service';
import { Router } from '../../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { } from "googlemaps";
import { MapsAPILoader } from '@agm/core';
//declare var google:any;
@Component({
  selector: 'app-abm-viajes',
  templateUrl: './abm-viajes.component.html',
  styleUrls: ['./abm-viajes.component.css']
})
export class AbmViajesComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  
  title: string = 'My first AGM project';
  lat: number = -34.662435;
  lng: number = -58.364977;//-34.662435, -58.364977
  zoom:number;
  premium:boolean;
  direccion:any;
  origin:{};
  destination: {};
  viaje = {
    origenLat: 0,
    origenLong: 0,
    destinoLat: 0,
    destinoLong: 0,
    cliente: "",
    fecha: 0,
    monto: 0,
    idChofer: 0,
    idVehiculo: 0,
    estado: ""
  }
  listado:any;
  constructor(public vehiculoService:VehiculoServiceService,public router:Router,public snackBar:MatSnackBar,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.premium = false;
    this.actualizarListado();
   }

  ngOnInit() {
    //create search FormControl
    this.searchControl = new FormControl();
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
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
    this.origin = { lat: 24.799448, lng: 120.979021 }
    this.destination = { lat: 24.799524, lng: 120.975017 }
  }
  
}
