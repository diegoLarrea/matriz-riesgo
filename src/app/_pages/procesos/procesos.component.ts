import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Proceso, ViewProceso } from 'src/_models/proceso';
import { Macroproceso } from 'src/_models/macroproceso';
import { ProcesoAPI } from 'src/_services/proceso.service';
import { MacroprocesoAPI } from 'src/_services/macroproceso.service';

declare var $:any;
@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {

  constructor(private apiPro: ProcesoAPI, private ngxService: NgxUiLoaderService, private dp:DatePipe, private toast: ToastrService, private apiMacro: MacroprocesoAPI) { }

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
      nombre: "Macroproceso"
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

  datos: ViewProceso[] = [];
  loading = true;
  p: number = 1;
  user = JSON.parse(localStorage.getItem("currentUser"));

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.loading = true;
    this.ngxService.start();
    this.apiPro.get().subscribe(
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

  procesoAdd: Proceso = new Proceso();
  loadingAdd = false;
  post(){
    if(this.procesoAdd.nombre != null && this.procesoAdd.nombre != "" && this.procesoAdd.macroproceso != null){
      this.loadingAdd = true;
      this.procesoAdd.usuario_creacion = this.user["cn"][0];
      this.procesoAdd.usuario_modificacion = this.user["cn"][0];
      this.apiPro.post(this.procesoAdd).subscribe(
        data => {
          this.loadingAdd = false;
          this.get();
          $("#modalAgregarProceso").modal("hide");
          this.toast.success("Dato agregado");
          this.procesoAdd = new Proceso();
        },
        error => {
          this.loadingAdd = false;
        }
      )
    }else{
      this.toast.error("Complete los campos obligatorios");
    }
  }

  procesoEdit: Proceso = new Proceso();
  loadingEdit = false;
  openPut(target:ViewProceso){
    let obj = Object.assign({}, target);
    delete obj.macroprocesoNombre;
    this.procesoEdit = Object.assign({}, obj);
    console.log(this.procesoEdit);
  }

  put(){
    if(this.procesoEdit.nombre != null && this.procesoEdit.nombre != "" && this.procesoEdit.macroproceso != null){
      this.loadingEdit = true;
      this.procesoEdit.usuario_modificacion = this.user["cn"][0];
      delete this.procesoEdit.fecha_modificacion;
      delete this.procesoEdit.fecha_creacion;
      delete this.procesoEdit.usuario_creacion;
      this.apiPro.put(this.procesoEdit).subscribe(
        data => {
          this.loadingEdit = false;
          this.get();
          $("#modalEditarProceso").modal("hide");
          this.toast.success("Dato actualizado");
          this.procesoEdit = new Proceso();
        },
        error => {
          this.loadingEdit = false;
        }
      )
    }else{
      this.toast.error("Complete los campos obligatorios");
    }
  }

  procesoDelete: Proceso = new Proceso();
  loadingDelete = false;
  openDelete(target){
    this.procesoDelete = Object.assign({}, target);
  }

  delete(){
    this.loadingDelete = true;
    this.apiPro.delete(this.procesoDelete.id).subscribe(
      data => {
        this.loadingDelete = false;
        this.get();
        $("#modalEliminarProceso").modal("hide");
        this.toast.success("Dato eliminado");
        this.procesoDelete = new Proceso();
      },
      error => {
        this.loadingDelete = false;
      }
    )
  }

  macroprocesos: Macroproceso[] = [];
  loadingMacro = false;
  getMacroprocesos(){
    this.loadingMacro = true;
    this.apiMacro.get().subscribe(
      data => {
        if(data.estado == 0){
          if (data.dato instanceof Array) {
            this.macroprocesos = data.dato;
          } else {
            this.macroprocesos = [];
            this.macroprocesos.push(data.dato);
          }
          this.macroprocesos.forEach(el => {
            el.fecha_creacion = this.dp.transform(el.fecha_creacion, 'dd/MM/yyyy HH:mm:ss', '-0600');
            el.fecha_modificacion = this.dp.transform(el.fecha_modificacion, 'dd/MM/yyyy HH:mm:ss', '-0600');
            if(!Date.parse(el.fecha_modificacion)) el.fecha_modificacion = null;
          });
        }else {
          this.macroprocesos = [];
        }
        this.loadingMacro = false;
      }
    )
  }
}
