import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Riesgo } from 'src/_models/riesgo';
import { RiesgoAPI } from 'src/_services/riesgo.service';

declare var $:any;
@Component({
  selector: 'app-riesgos',
  templateUrl: './riesgos.component.html',
  styleUrls: ['./riesgos.component.scss']
})
export class RiesgosComponent implements OnInit {

  constructor(private apiRiesgo: RiesgoAPI, private ngxService: NgxUiLoaderService, private dp:DatePipe, private toast: ToastrService) { }

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

  datos: Riesgo[] = [];
  loading = true;
  p: number = 1;
  user = JSON.parse(localStorage.getItem("currentUser"));

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.loading = true;
    this.ngxService.start();
    this.apiRiesgo.get().subscribe(
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

  riesgoAdd: Riesgo = new Riesgo();
  loadingAdd = false;
  post(){
    if(this.riesgoAdd.nombre != null && this.riesgoAdd.nombre != ""){
      this.loadingAdd = true;
      this.riesgoAdd.usuario_creacion = this.user["cn"][0];
      this.riesgoAdd.usuario_modificacion = this.user["cn"][0];
      this.apiRiesgo.post(this.riesgoAdd).subscribe(
        data => {
          this.loadingAdd = false;
          this.get();
          $("#modalAgregarRiesgo").modal("hide");
          this.toast.success("Dato agregado");
          this.riesgoAdd = new Riesgo();
        },
        error => {
          this.loadingAdd = false;
        }
      )
    }else{
      this.toast.error("Complete los campos obligatorios");
    }
  }

  riesgoEdit: Riesgo = new Riesgo();
  loadingEdit = false;
  openPut(target){
    this.riesgoEdit = Object.assign({}, target);
  }

  put(){
    if(this.riesgoEdit.nombre != null && this.riesgoEdit.nombre != ""){
      this.loadingEdit = true;
      this.riesgoEdit.usuario_modificacion = this.user["cn"][0];
      delete this.riesgoEdit.fecha_modificacion;
      delete this.riesgoEdit.fecha_creacion;
      delete this.riesgoEdit.usuario_creacion;
      this.apiRiesgo.put(this.riesgoEdit).subscribe(
        data => {
          this.loadingEdit = false;
          this.get();
          $("#modalEditarRiesgo").modal("hide");
          this.toast.success("Dato actualizado");
          this.riesgoEdit = new Riesgo();
        },
        error => {
          this.loadingEdit = false;
        }
      )
    }else{
      this.toast.error("Complete los campos obligatorios");
    }
  }

  riesgoDelete: Riesgo = new Riesgo();
  loadingDelete = false;
  openDelete(target){
    this.riesgoDelete = Object.assign({}, target);
  }

  delete(){
    this.loadingDelete = true;
    this.apiRiesgo.delete(this.riesgoDelete.id).subscribe(
      data => {
        this.loadingDelete = false;
        this.get();
        $("#modalEliminarRiesgo").modal("hide");
        this.toast.success("Dato eliminado");
        this.riesgoDelete = new Riesgo();
      },
      error => {
        this.loadingDelete = false;
      }
    )
  }
}
