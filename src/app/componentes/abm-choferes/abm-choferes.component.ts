import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../../servicios/usuario-service.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-abm-choferes',
  templateUrl: './abm-choferes.component.html',
  styleUrls: ['./abm-choferes.component.css']
})
export class AbmChoferesComponent implements OnInit {
  listado:any;
  settings = {
    mode:'in-line',
    columns: {
      id: {
        title: 'ID',
        editable: false,
        addable: false
      },
      nombre: {
        title: 'Nombre'
      },
      sexo: {
        title: 'Sexo',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Masculino', title: 'Masculino' }, { value: 'Femenino', title: 'Femenino' }]
          }
        }
      },
      usuario: {
        title: 'Usuario'
      },
      password: {
        title: 'Contraseña'
      },
      perfil: {
        title: 'Perfil',
        editable:false,
        addable: false
      },
      habilitado: {
        title: 'Habilitado',
        editable: false,
        addable: false
      },
      idVehiculo: {
        title: 'Vehiculo',
        editable: false,
        addable: false
      },
      estado: {
        title: 'Estado',
        editable: false,
        addable: false
      }
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
  constructor(public usuariosServicio:UsuarioServiceService,public snackBar: MatSnackBar) {
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
    this.usuariosServicio.traerListaPorPerfil(localStorage.getItem("token"),"chofer").then(datos => {
      this.listado = datos;
      console.info(this.listado);
    }).catch(error => {
      console.log(error);
    })
  }
  ver(){
    console.info(this.listado);
  }
  onDeleteConfirm(event) {
    if (window.confirm('Estas Seguro que queres borrarlo?')) {
      this.usuariosServicio.Borrar(localStorage.getItem("token"),event.data.usuario).then(datos => {
        this.openSnackBar(datos.respuesta);
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
      event.newData.estado = "En Casa";
      event.newData.habilitado = 1;
      this.usuariosServicio.GuardarEditado(localStorage.getItem("token"),event.newData).then(datos => {
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
      event.newData.perfil = "chofer";
      event.newData.id = 0;
      event.newData.habilitado = 1;
      event.newData.idVehiculo = 0;
      event.newData.estado = "En Casa";
      console.info(event.newData);
      this.usuariosServicio.GuardarNuevo(localStorage.getItem("token"),event.newData).then(datos => {
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
