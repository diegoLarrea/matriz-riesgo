import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Macroproceso } from 'src/_models/macroproceso';
import { MacroprocesoAPI } from 'src/_services/macroproceso.service';

declare var $:any;
@Component({
  selector: 'app-macroprocesos',
  templateUrl: './macroprocesos.component.html',
  styleUrls: ['./macroprocesos.component.scss']
})
export class MacroprocesosComponent implements OnInit {

  constructor(private apiMacro: MacroprocesoAPI, private ngxService: NgxUiLoaderService, private dp:DatePipe, private toast: ToastrService) { }

  columns = [
    {
      nombre: "ID"
    },
    {
      nombre: "Nombre"
    },
    {
      nombre: "Descripción"
    },
    {
      nombre: "Creado por"
    },
    {
      nombre: "Creado el"
    },
    {
      nombre: "Modificado por"
    },
    {
      nombre: "Modificado el"
    },
    {
      nombre: "Acciones"
    }
  ]

  datos: Macroproceso[] = [];
  loading = true;
  p: number = 1;
  user = JSON.parse(localStorage.getItem("currentUser"));

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.loading = true;
    this.ngxService.start();
    this.apiMacro.get().subscribe(
      data => {
        if(data.estado == 0){
          if (data.dato instanceof Array) {
            this.datos = data.dato;
          } else {
            this.datos = [];
            this.datos.push(data.dato);
          }
          this.datos.forEach(el => {
            el.fecha_creacion = this.dp.transform(el.fecha_creacion, 'dd/MM/yyyy HH:mm:ss', '-0600');
            el.fecha_modificacion = this.dp.transform(el.fecha_modificacion, 'dd/MM/yyyy HH:mm:ss', '-0600');
            if(!Date.parse(el.fecha_modificacion)) el.fecha_modificacion = null;
          });
        }else {
          this.datos = [];
        }
        this.loading = false;
        this.ngxService.stop();
      }
    )
  }

  macroAdd: Macroproceso = new Macroproceso();
  loadingAdd = false;
  post(){
    if(this.macroAdd.nombre != null && this.macroAdd.nombre != ""){
      this.loadingAdd = true;
      this.macroAdd.usuario_creacion = this.user["cn"][0];
      this.macroAdd.usuario_modificacion = this.user["cn"][0];
      this.apiMacro.post(this.macroAdd).subscribe(
        data => {
          this.loadingAdd = false;
          this.get();
          $("#modalAgregarMacro").modal("hide");
          this.toast.success("Dato agregado");
          this.macroAdd = new Macroproceso();
        },
        error => {
          this.loadingAdd = false;
        }
      )
    }else{
      this.toast.error("Complete los campos obligatorios");
    }
  }

  macroEdit: Macroproceso = new Macroproceso();
  loadingEdit = false;
  openPut(target){
    this.macroEdit = Object.assign({}, target);
  }

  put(){
    if(this.macroEdit.nombre != null && this.macroEdit.nombre != ""){
      this.loadingEdit = true;
      this.macroEdit.usuario_modificacion = this.user["cn"][0];
      delete this.macroEdit.fecha_modificacion;
      delete this.macroEdit.fecha_creacion;
      delete this.macroEdit.usuario_creacion;
      this.apiMacro.put(this.macroEdit).subscribe(
        data => {
          this.loadingEdit = false;
          this.get();
          $("#modalEditarMacro").modal("hide");
          this.toast.success("Dato actualizado");
          this.macroEdit = new Macroproceso();
        },
        error => {
          this.loadingEdit = false;
        }
      )
    }else{
      this.toast.error("Complete los campos obligatorios");
    }
  }

  macroDelete: Macroproceso = new Macroproceso();
  loadingDelete = false;
  openDelete(target){
    this.macroDelete = Object.assign({}, target);
  }

  delete(){
    this.loadingDelete = true;
    this.apiMacro.delete(this.macroDelete.id).subscribe(
      data => {
        this.loadingDelete = false;
        this.get();
        $("#modalEliminarMacro").modal("hide");
        this.toast.success("Dato eliminado");
        this.macroDelete = new Macroproceso();
      },
      error => {
        this.loadingDelete = false;
      }
    )
  }

}
