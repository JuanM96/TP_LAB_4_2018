import { Component, OnInit } from '@angular/core';
import { VehiculoServiceService } from '../../servicios/vehiculo-service.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { Router } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'app-abm-vehiculos',
  templateUrl: './abm-vehiculos.component.html',
  styleUrls: ['./abm-vehiculos.component.css']
})
export class AbmVehiculosComponent implements OnInit {
  listado:any;
  settings = {
    mode:'in-line',
    columns: {
      id: {
        title: 'ID',
        editable: false,
        addable: false
      },
      marca: {
        title: 'Marca'
      },
      color: {
        title: 'Color'
      },
      patente: {
        title: 'Patente'
      },
      habilitado: {
        title: 'Habilitado',
        editable: false,
        addable: false
      },
    },
    actions:{
      columnTitle:"Acciones",
      edit:true,
      add:true,
      delete:true
    },
    edit:{
      editButtonContent: "Editar/Habilitar",
      saveButtonContent: "Guardar",
      confirmSave: true,
      cancelButtonContent: "Cancelar"
    },
    add:{
      addButtonContent: "Nuevo",
      createButtonContent: "Crear",
      confirmCreate: true,
      cancelButtonContent: "Cancelar"
    },
    delete:{
      deleteButtonContent: "Deshabilitar",
      confirmDelete: true,
      cancelButtonContent: "Cancelar"
    }

  };
  constructor(public vehiculoService:VehiculoServiceService,public snackBar: MatSnackBar,public router:Router) {
    this.actualizarListado();
    /*if (ret["error"]) {
      alert(ret["errorMsg"]);
    }
    else{
      this.listado=ret["listado"];
    }*/
   }

  ngOnInit() {
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
  ver(){
    console.info(this.listado);
  }
  onDeleteConfirm(event) {
    if (window.confirm('Estas Seguro que queres borrarlo?')) {
      this.vehiculoService.Borrar(localStorage.getItem("token"),event.data.id).then(datos => {
        this.openSnackBar(datos.resultado);
        event.confirm.resolve();
        this.actualizarListado();
      }).catch(error => {
        console.info(error);
      });
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Estas Seguro que queres editarlo?')) {
      event.newData.habilitado = 1;
      this.vehiculoService.GuardarEditado(localStorage.getItem("token"),event.newData).then(datos => {
        this.openSnackBar(datos.respuesta);
        event.confirm.resolve(event.newData);
        this.actualizarListado();
      }).catch(error => {
        console.info(error);
      })
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Estas Seguro que queres agregarlo?')) {
      event.newData.habilitado = 1;
      console.info(event.newData);
      this.vehiculoService.GuardarNuevo(localStorage.getItem("token"),event.newData).then(datos => {
        console.info(datos);
        this.openSnackBar(datos.respuesta);
        event.confirm.resolve(event.newData);
        this.actualizarListado();
      }).catch(error => {
        console.info(error);
      });
    } else {
      event.confirm.reject();
    }
  }
  openSnackBar(msg:string) {
    this.snackBar.open(msg,'OK',{duration:3000});
    /*this.snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 500,
    });*/
  }

}
