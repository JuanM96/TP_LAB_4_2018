import { Component, OnInit } from '@angular/core';
import { AbmEncuestaComponent } from '../abm-encuesta/abm-encuesta.component';
import { MatDialog, MatSnackBar } from '../../../../node_modules/@angular/material';
import { ViajeServiceService } from '../../servicios/viaje-service.service';
import { UsuarioServiceService } from '../../servicios/usuario-service.service';
import { VehiculoServiceService } from '../../servicios/vehiculo-service.service';
import { AsignarModalComponent } from '../asignar-modal/asignar-modal.component';

@Component({
  selector: 'app-visor-viajes',
  templateUrl: './visor-viajes.component.html',
  styleUrls: ['./visor-viajes.component.css']
})
export class VisorViajesComponent implements OnInit {
  listado:any;
  listadoViajes:any;
  listadoUsuarios:any;
  listadoVehiculos:any;
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  idViaje:number;
  idChofer:number;
  idCliente:number;
  idVehiculo:number;
  filtrarEstado:string;
  constructor(public dialog:MatDialog,public viajeService:ViajeServiceService,public usuarioService:UsuarioServiceService,public vehiculoService:VehiculoServiceService,public snackBar:MatSnackBar) {
    this.filtrarEstado = "Todos";
    this.usuarioService.traerListaCompleta(localStorage.getItem('token')).then(datos => {
      this.listadoUsuarios = datos;
      console.info(this.listadoUsuarios);
      this.vehiculoService.traerListaCompleta(localStorage.getItem('token')).then(datos => {
        this.listadoVehiculos = datos;
        console.info(this.listadoVehiculos);
        this.actualizarListado();
      })
    })
   }

  ngOnInit() {
  }
  realizarEncuesta(idViaje:any){
    const dialogRef = this.dialog.open(AbmEncuestaComponent, {
      width: '400px',
      data: {idViaje:idViaje}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.info(result);
      this.actualizarListado();
    });
  }
  actualizarListado(){
    this.listado = new Array();
    // this.viajeService.traerListaCompleta(localStorage.getItem('token')).then(datos =>{
    //   console.info(datos);
    //   datos.forEach(viaje => {
    //     let nombreChofer;
    //     if (viaje.idChofer != 0 && viaje.idChofer != "Sin Chofer") {
    //       this.idChofer = viaje.idChofer;
    //       let nombreChofer = this.buscarNombreId(viaje.idChofer,'usuario');
    //       console.info(nombreChofer);
    //       viaje.idChofer = nombreChofer.nombre;
    //     }
    //     else{
    //       console.log(viaje.idChofer);
    //       viaje.idChofer = "Sin Chofer";
    //     }
    //     if (viaje.idVehiculo != 0 && viaje.idVehiculo != "Sin Vehiculo") {
    //       this.idVehiculo = viaje.idVehiculo;
    //       let vehiculo = this.buscarNombreId(viaje.idVehiculo,'vehiculo');
    //       viaje.idVehiculo = vehiculo;
    //     }
    //     else{
    //       viaje.idVehiculo = "Sin Vehiculo";
    //     }
    //     let nombreCliente = this.buscarNombreId(viaje.idCliente,'usuario');
    //     this.idCliente = viaje.idCliente;
    //     viaje.idCliente = nombreCliente.nombre;
        
        
    //     this.listado.push(viaje);
    //   });
    // }).catch(error =>{
    //   console.log(error)
    // })
    this.filtrarListado();
    this.viajeService.traerListaCompleta(localStorage.getItem('token')).then(datos =>{
      this.listadoViajes = datos;
      console.info(datos);
    });

  }
  filtrarListado(){
    switch (this.filtrarEstado) {
      case 'EnViaje':
        this.viajeService.traerTodosPorEstado(localStorage.getItem('token'),"En Viaje").then(datos =>{
          console.info(datos);
          datos.forEach(viaje => {
            let nombreChofer;
            if (viaje.idChofer != 0 && viaje.idChofer != "Sin Chofer") {
              this.idChofer = viaje.idChofer;
              let nombreChofer = this.buscarNombreId(viaje.idChofer,'usuario');
              console.info(nombreChofer);
              viaje.idChofer = nombreChofer.nombre;
            }
            else{
              console.log(viaje.idChofer);
              viaje.idChofer = "Sin Chofer";
            }
            if (viaje.idVehiculo != 0 && viaje.idVehiculo != "Sin Vehiculo") {
              this.idVehiculo = viaje.idVehiculo;
              let vehiculo = this.buscarNombreId(viaje.idVehiculo,'vehiculo');
              viaje.idVehiculo = vehiculo;
            }
            else{
              viaje.idVehiculo = "Sin Vehiculo";
            }
            let nombreCliente = this.buscarNombreId(viaje.idCliente,'usuario');
            this.idCliente = viaje.idCliente;
            viaje.idCliente = nombreCliente.nombre;
            
            
            this.listado.push(viaje);
          });
        }).catch(error =>{
          console.log(error)
        })
        break;
      case 'Cancelado':
        this.viajeService.traerTodosPorEstado(localStorage.getItem('token'),"Cancelado").then(datos =>{
          console.info(datos);
          datos.forEach(viaje => {
            let nombreChofer;
            if (viaje.idChofer != 0 && viaje.idChofer != "Sin Chofer") {
              this.idChofer = viaje.idChofer;
              let nombreChofer = this.buscarNombreId(viaje.idChofer,'usuario');
              console.info(nombreChofer);
              viaje.idChofer = nombreChofer.nombre;
            }
            else{
              console.log(viaje.idChofer);
              viaje.idChofer = "Sin Chofer";
            }
            if (viaje.idVehiculo != 0 && viaje.idVehiculo != "Sin Vehiculo") {
              this.idVehiculo = viaje.idVehiculo;
              let vehiculo = this.buscarNombreId(viaje.idVehiculo,'vehiculo');
              viaje.idVehiculo = vehiculo;
            }
            else{
              viaje.idVehiculo = "Sin Vehiculo";
            }
            let nombreCliente = this.buscarNombreId(viaje.idCliente,'usuario');
            this.idCliente = viaje.idCliente;
            viaje.idCliente = nombreCliente.nombre;
            
            
            this.listado.push(viaje);
          });
        }).catch(error =>{
          console.log(error)
        })
        break;
      case 'Pendiente':
        this.viajeService.traerTodosPorEstado(localStorage.getItem('token'),"Pendiente").then(datos =>{
          console.info(datos);
          datos.forEach(viaje => {
            let nombreChofer;
            if (viaje.idChofer != 0 && viaje.idChofer != "Sin Chofer") {
              this.idChofer = viaje.idChofer;
              let nombreChofer = this.buscarNombreId(viaje.idChofer,'usuario');
              console.info(nombreChofer);
              viaje.idChofer = nombreChofer.nombre;
            }
            else{
              console.log(viaje.idChofer);
              viaje.idChofer = "Sin Chofer";
            }
            if (viaje.idVehiculo != 0 && viaje.idVehiculo != "Sin Vehiculo") {
              this.idVehiculo = viaje.idVehiculo;
              let vehiculo = this.buscarNombreId(viaje.idVehiculo,'vehiculo');
              viaje.idVehiculo = vehiculo;
            }
            else{
              viaje.idVehiculo = "Sin Vehiculo";
            }
            let nombreCliente = this.buscarNombreId(viaje.idCliente,'usuario');
            this.idCliente = viaje.idCliente;
            viaje.idCliente = nombreCliente.nombre;
            
            
            this.listado.push(viaje);
          });
        }).catch(error =>{
          console.log(error)
        })
        break;
      case 'Todos':
        this.viajeService.traerListaCompleta(localStorage.getItem('token')).then(datos =>{
          console.info(datos);
          datos.forEach(viaje => {
            let nombreChofer;
            if (viaje.idChofer != 0 && viaje.idChofer != "Sin Chofer") {
              this.idChofer = viaje.idChofer;
              let nombreChofer = this.buscarNombreId(viaje.idChofer,'usuario');
              console.info(nombreChofer);
              viaje.idChofer = nombreChofer.nombre;
            }
            else{
              console.log(viaje.idChofer);
              viaje.idChofer = "Sin Chofer";
            }
            if (viaje.idVehiculo != 0 && viaje.idVehiculo != "Sin Vehiculo") {
              this.idVehiculo = viaje.idVehiculo;
              let vehiculo = this.buscarNombreId(viaje.idVehiculo,'vehiculo');
              viaje.idVehiculo = vehiculo;
            }
            else{
              viaje.idVehiculo = "Sin Vehiculo";
            }
            let nombreCliente = this.buscarNombreId(viaje.idCliente,'usuario');
            this.idCliente = viaje.idCliente;
            viaje.idCliente = nombreCliente.nombre;
            
            
            this.listado.push(viaje);
          });
        }).catch(error =>{
          console.log(error)
        })
        break;
    
      default:
        break;
    }
  }
  buscarNombreId(id:number,clase:string){
    let ret:any;
    switch (clase) {
      case 'usuario':
        this.listadoUsuarios.forEach(usuario => {
          if (usuario.id == id) {
            ret = usuario;
          }
        });
        break;
      case 'vehiculo':
        this.listadoVehiculos.forEach(vehiculo => {
          if (vehiculo.id == id) {
            ret = vehiculo;
          }
        });
        break;
      default:
        break;
    }
    return ret;
  }
  desasignarChofer(viaje:any){
    viaje.idChofer = 0;
    viaje.estado = "Pendiente";
    this.listadoViajes.forEach(viajeEnLista => {
      if (viajeEnLista.id == viaje.id) {
        viaje.idCliente = viajeEnLista.idCliente;
        viaje.idVehiculo = viajeEnLista.idVehiculo;
      }
    });
    this.viajeService.GuardarEditado(localStorage.getItem('token'),viaje).then(datos => {
      this.openSnackBar(datos.respuesta);
      this.actualizarListado();
    })
  }
  asignarChofer(idViaje:number){
    const dialogRef = this.dialog.open(AsignarModalComponent, {
      width: '300px',
      data: {idViaje:idViaje, asignar:'Chofer'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.info(result);
      this.actualizarListado();
    });
  }
  desasignarVehiculo(viaje:any){
    viaje.idVehiculo = 0;
    this.listadoViajes.forEach(viajeEnLista => {
      if (viajeEnLista.id == viaje.id) {
        viaje.idCliente = viajeEnLista.idCliente;
        viaje.idChofer = viajeEnLista.idChofer;
      }
    });
    this.viajeService.GuardarEditado(localStorage.getItem('token'),viaje).then(datos => {
      this.openSnackBar(datos.respuesta);
      this.actualizarListado();
    });
  }
  asignarVehiculo(idViaje:number){
    const dialogRef = this.dialog.open(AsignarModalComponent, {
      width: '300px',
      data: {idViaje:idViaje, asignar:'Vehiculo'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.info(result);
      this.actualizarListado();
    });
  }
  openSnackBar(msg:string) {
    this.snackBar.open(msg,'OK',{duration:3000});
  }
  cancelarViaje(idViaje:number){
    this.viajeService.CancelarViaje(localStorage.getItem('token'),idViaje).then(datos => {
      console.info(datos._body);
      this.openSnackBar("Viaje Cancelado con Exito");
    })
  }
}
