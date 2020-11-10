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

declare var $:any;
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

  PO = [
    {
      nombre: "Rara vez",
      descripcion: "El evento de riesgo NO OCURRIÓ o no conoce que haya ocurrido alguna vez",
      badge: "badge badge-success"
    },
    {
      nombre: "Puede ocurrir",
      descripcion: "El evento OCURRIÓ POR LO MENOS 1 VEZ EN LOS ÚLTIMOS 12 MESES",
      badge: "badge badge-warning"
    },
    {
      nombre: "Muy frecuente",
      descripcion: "El evento OCURRIÓ POR LO MENOS 4 VECES EN EL ÚLTIMO MES",
      badge: "badge badge-danger"
    }

  ]
  I = [
    {
      nombre: "Leve",
      descripcion: "El impacto del evento sería MUY PEQUEÑO SOBRE EL PROCESO",
      badge: "badge badge-success"
    },
    {
      nombre: "Moderado",
      descripcion: "El impacto del evento AFECTARÍA EL PROCESO SIN QUE ELLO SEA CRÍTICO",
      badge: "badge badge-warning"
    },
    {
      nombre: "Muy grave",
      descripcion: "El impacto del evento EVITARÁ LA NORMAL FLUIDEZ DEL PROCESO",
      badge: "badge badge-danger"
    }
  ]
  Iparser = {
    "Leve":"badge badge-success",
    "Moderado":"badge badge-warning",
    "Muy grave":"badge badge-danger",
    "Rara vez":"badge badge-success",
    "Puede ocurrir":"badge badge-warning",
    "Muy frecuente":"badge badge-danger"
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
  itesmpp(e){
    this.tableManager.params.can = e;
    this.get(1);
  }

  // ADD
  apAdd: Autoevaluacion = new Autoevaluacion();
  loadingAdd = false;
  riesgos: Riesgo[] = [];
  procesos: ViewProceso[] = [];
  loadingRiesgos = false;
  loadingProcesos = false;

  getRiesgos(){
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

  getProcesos(){
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

  check(target:Autoevaluacion){
    return target.proceso != null
    && target.riesgo != null
    && target.impacto != null
    && target.probabilidadOcurrencia != null 
    && target.implicacionRiesgo != null && target.implicacionRiesgo != ""
    && target.descripcion != null && target.descripcion != "";
  }

  addCampoPost(){
    let add = true;
    for(let i=0; i<this.apAdd.camposPersonalizados.length;i++){
      if(this.apAdd.camposPersonalizados[i].nombre == null || this.apAdd.camposPersonalizados[i].valor == null){
        add = false;
      }
    }
    if(add)this.apAdd.camposPersonalizados.push(new Campo());
  }

  post(){
    if(this.check(this.apAdd)){
      let obj = Object.assign({}, this.apAdd);
      if(obj.camposPersonalizados.length > 0){
        obj.camposPersonalizados = JSON.stringify(obj.camposPersonalizados);
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
    }else{
      this.toast.error("Complete los campos obligatorios");
    }
  }

  changeImpactoAdd(e){
    this.apAdd.impactoDescripcion = e.descripcion;
  }

  changeProbOcurrenciaAdd(e){
    this.apAdd.probabilidadOcurrenciaDescripcion = e.descripcion;
  }
}
