import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Autoevaluacion, Campo, ViewAutoevaluacion } from 'src/_models/autoevaluacion';
import { AutoevaluacionAPI } from 'src/_services/autoevaluacion.service';
import { TableMaganer } from 'src/_utils/table';
import { DatePipe } from '@angular/common';
import { ProcesoAPI } from 'src/_services/proceso.service';
import { RiesgoAPI } from 'src/_services/riesgo.service';
import { Riesgo } from 'src/_models/riesgo';
import { ViewProceso } from 'src/_models/proceso';
import { ConfAPI } from 'src/_services/conf.service';

declare var $: any;
@Component({
  selector: 'app-autoevaluacion-procesos',
  templateUrl: './autoevaluacion-procesos.component.html',
  styleUrls: ['./autoevaluacion-procesos.component.scss']
})
export class AutoevaluacionProcesosComponent implements OnInit {

  constructor(private toast: ToastrService,
    private ngxService: NgxUiLoaderService,
    private apiAutoevaluacion: AutoevaluacionAPI,
    private apiPro: ProcesoAPI,
    private apiRiesgo: RiesgoAPI,
    private apiConf: ConfAPI,
    private dp: DatePipe) {
    this.headers = [
      { columnName: "ID", by: "id", center: true },
      { columnName: "Macroproceso", by: "macroprocesoNombre", center: false },
      { columnName: "Proceso", by: "procesoNombre", center: false },
      { columnName: "Riesgo", by: "riesgo", center: false },
      { columnName: "Implicación de riesgo", by: "implicacionRiesgo", center: false },
      { columnName: "Prob. de ocurrencia", by: "probabilidadOcurrencia", center: false },
      { columnName: "Descrip. prob. de ocurrencia", by: null, center: false },
      { columnName: "Impacto", by: "impacto", center: false },
      { columnName: "Descrip. impacto", by: null, center: false },
      { columnName: "Desc. control / Mit. existente", by: "descripcion", center: false },
      { columnName: "Rec. mejora sugerida", by: "mejora", center: false },
      { columnName: "Creado por", by: "usuario_creacion", center: false },
      { columnName: "Creado el", by: "fecha_creacion", center: false },
      { columnName: "Modificado por", by: "usuario_modificacion", center: false },
      { columnName: "Modificado el", by: "fecha_modificacion", center: false },
      { columnName: "Acciones", by: null, center: false },
    ];
    this.tableManager.init(this.headers, 14, "DESC");
  }
  user = JSON.parse(localStorage.getItem("currentUser"));

  headers = null;
  tableManager = new TableMaganer();
  datos: ViewAutoevaluacion[] = [];
  filtros = {
    buscar: null
  };
  p: number = 1;
  total: number = 0;
  loading = true;

  badgeParser = {
    "B": "badge badge-success",
    "M": "badge badge-warning",
    "A": "badge badge-danger",
  }
  ngOnInit(): void {
    this.get(1);
    this.apAdd.camposPersonalizados = [];
  }

  limpiarFiltros() {
    this.tableManager.params.can = 10;
    this.tableManager.params.type = "OR";
    this.filtros.buscar = null;
    this.get(1);
  }

  get(page) {
    this.loading = true;
    this.ngxService.start();
    this.tableManager.params.page = page;
    this.tableManager.setFilters(this.filtros);
    this.apiAutoevaluacion.get(this.tableManager.params).subscribe(
      data => {
        if (data.estado == 0) {
          if (data.dato instanceof Array) {
            this.datos = data.dato;
          } else {
            this.datos = [];
            this.datos.push(data.dato);
          }

          this.total = data.total;
          this.p = page;
        } else {
          this.datos = [];
          this.p = 1;
          this.total = null;
        }
        this.datos.forEach(el => {
          el.fecha_creacion = this.dp.transform(el.fecha_creacion, 'dd/MM/yyyy HH:mm:ss', '-0600');
          el.fecha_modificacion = this.dp.transform(el.fecha_modificacion, 'dd/MM/yyyy HH:mm:ss', '-0600');
          if (el.camposPersonalizados != null) {
            el.camposPersonalizados = JSON.parse(el.camposPersonalizados);
          }
        });
        this.ngxService.stop();
        this.loading = false;
      }
    )
  }

  sort(val, j) {
    if (val) {
      this.tableManager.sortBy(j);
      this.get(this.p);
    }
  }

  // PAGINATOR
  itesmpp(e) {
    this.tableManager.params.can = e;
    this.get(1);
  }

  // VER CAMPOS PERSONALIZADOS
  targetVerCampos: ViewAutoevaluacion = new ViewAutoevaluacion();

  // GETS
  riesgos: Riesgo[] = [];
  procesos: ViewProceso[] = [];
  impactos = [];
  pOc = [];
  loadingRiesgos = false;
  loadingProcesos = false;
  loadingImpactos = false;
  loadingPOc = false;

  getRiesgos() {
    this.loadingRiesgos = true;
    this.apiRiesgo.get().subscribe(
      data => {
        if (data.dato instanceof Array) {
          this.riesgos = data.dato;
        } else {
          this.riesgos = [];
          this.riesgos.push(data.dato);
        }
        this.loadingRiesgos = false;
      }
    )
  }

  getProcesos() {
    this.loadingProcesos = true;
    this.apiPro.get().subscribe(
      data => {
        if (data.dato instanceof Array) {
          this.procesos = data.dato;
        } else {
          this.procesos = [];
          this.procesos.push(data.dato);
        }
        this.loadingProcesos = false;
      }
    )
  }

  getImpactos() {
    this.loadingImpactos = true;
    this.apiConf.getImpactos().subscribe(
      data => {
        if (data.dato instanceof Array) {
          this.impactos = data.dato;
        } else {
          this.impactos = [];
          this.impactos.push(data.dato);
        }
        this.loadingImpactos = false;
      }
    )
  }

  getProbOcurrencia() {
    this.loadingPOc = true;
    this.apiConf.getProbOcurrencia().subscribe(
      data => {
        if (data.dato instanceof Array) {
          this.pOc = data.dato;
        } else {
          this.pOc = [];
          this.pOc.push(data.dato);
        }
        this.loadingPOc = false;
      }
    )
  }

  check(target: Autoevaluacion) {
    return target.proceso != null
      && target.riesgo != null
      && target.impacto != null
      && target.probabilidadOcurrencia != null
      && target.implicacionRiesgo != null && target.implicacionRiesgo != ""
      && target.descripcion != null && target.descripcion != "";
  }

  // ADD
  apAdd: Autoevaluacion = new Autoevaluacion();
  loadingAdd = false;

  addCampoPost() {
    let add = true;
    for (let i = 0; i < this.apAdd.camposPersonalizados.length; i++) {
      if (this.apAdd.camposPersonalizados[i].nombre == null || this.apAdd.camposPersonalizados[i].valor == null) {
        add = false;
      }
    }
    if (add) this.apAdd.camposPersonalizados.push(new Campo());
  }

  openAdd() {
    this.getImpactos();
    this.getProcesos();
    this.getProbOcurrencia();
    this.getRiesgos();
  }

  post() {
    if (this.check(this.apAdd)) {
      let obj = Object.assign({}, this.apAdd);
      if (obj.camposPersonalizados.length > 0) {
        let hasData = true;
        for (let i = 0; i < this.apAdd.camposPersonalizados.length; i++) {
          if (this.apAdd.camposPersonalizados[i].nombre == null || this.apAdd.camposPersonalizados[i].valor == null) {
            hasData = false;
          }
        }
        if (hasData) {
          obj.camposPersonalizados = JSON.stringify(obj.camposPersonalizados);
        } else {
          obj.camposPersonalizados = null;
        }
      }else{
        obj.camposPersonalizados = null;
      }
      this.loadingAdd = true;
      obj.usuario_creacion = this.user["cn"][0];
      obj.usuario_modificacion = this.user["cn"][0];
      this.apiAutoevaluacion.post(obj).subscribe(
        data => {
          this.loadingAdd = false;
          this.get(1);
          this.apAdd = new Autoevaluacion();
          this.apAdd.camposPersonalizados = [];
          $("#modalAgregar").modal("hide");
          this.toast.success("Autoevaluación de procesos agregada");
        }
      )
    } else {
      this.toast.error("Complete los campos obligatorios");
    }
  }

  // DELETE
  apDelete: ViewAutoevaluacion = new ViewAutoevaluacion();
  loadingDelete = false;
  openDelete(target) {
    this.apDelete = Object.assign({}, target);
  }

  delete() {
    this.loadingDelete = true;
    this.apiAutoevaluacion.delete(this.apDelete.id).subscribe(
      data => {
        this.loadingDelete = false;
        this.get(1);
        $("#modalEliminar").modal("hide");
        this.toast.success("Dato eliminado");
        this.apDelete = new ViewAutoevaluacion();
      },
      error => {
        this.loadingDelete = false;
      }
    )
  }

  // EDIT
  apEdit: Autoevaluacion = new Autoevaluacion();
  loadingEdit = false;

  editCampoPost() {
    let edit = true;
    for (let i = 0; i < this.apEdit.camposPersonalizados.length; i++) {
      if (this.apEdit.camposPersonalizados[i].nombre == null || this.apEdit.camposPersonalizados[i].valor == null) {
        edit = false;
      }
    }
    if (edit) this.apEdit.camposPersonalizados.push(new Campo());
  }

  openPut(target) {
    let obj:ViewAutoevaluacion = Object.assign({}, target);
    delete obj.impactoCodigo;
    delete obj.impactoDescripcion;
    delete obj.impactoValor;
    delete obj.impactoDescripcion;
    delete obj.probabilidadOcurrenciaCodigo;
    delete obj.probabilidadOcurrenciaDescripcion;
    delete obj.probabilidadOcurrenciaValor;
    delete obj.probabilidadOcurrenciaDescripcion;
    delete obj.procesoNombre;
    delete obj.macroprocesoNombre;
    delete obj.riesgoNombre;
    this.apEdit = Object.assign({}, obj);
    if(this.apEdit.camposPersonalizados == null){
      this.apEdit.camposPersonalizados = [];
    }
    this.getImpactos();
    this.getProcesos();
    this.getProbOcurrencia();
    this.getRiesgos();
  }

  put() {
    if (this.check(this.apEdit)) {
      let obj = Object.assign({}, this.apEdit);
      if (obj.camposPersonalizados.length > 0) {
        let hasData = true;
        for (let i = 0; i < this.apEdit.camposPersonalizados.length; i++) {
          if (this.apEdit.camposPersonalizados[i].nombre == null || this.apEdit.camposPersonalizados[i].valor == null) {
            hasData = false;
          }
        }
        if (hasData) {
          obj.camposPersonalizados = JSON.stringify(obj.camposPersonalizados);
        } else {
          obj.camposPersonalizados = null;
        }
      }else{
        obj.camposPersonalizados = null;
      }
      this.loadingEdit = true;
      obj.usuario_modificacion = this.user["cn"][0];
      delete obj.fecha_modificacion;
      delete obj.fecha_creacion;
      delete obj.usuario_creacion;
      this.apiAutoevaluacion.put(obj).subscribe(
        data => {
          this.loadingEdit = false;
          this.get(1);
          this.apEdit = new Autoevaluacion();
          this.apEdit.camposPersonalizados = [];
          $("#modalEditar").modal("hide");
          this.toast.success("Autoevaluación de procesos editada");
        }
      )
    } else {
      this.toast.error("Complete los campos obligatorios");
    }
  }
}
