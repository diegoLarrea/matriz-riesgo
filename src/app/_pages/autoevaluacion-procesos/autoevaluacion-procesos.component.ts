import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Autoevaluacion, ViewAutoevaluacion } from 'src/_models/autoevaluacion';
import { AutoevaluacionAPI } from 'src/_services/autoevaluacion.service';
import { TableMaganer } from 'src/_utils/table';
import { DatePipe } from '@angular/common';
import { MacroprocesoAPI } from 'src/_services/macroproceso.service';
import { ProcesoAPI } from 'src/_services/proceso.service';
import { RiesgoAPI } from 'src/_services/riesgo.service';
import { Riesgo } from 'src/_models/riesgo';
import { ViewProceso } from 'src/_models/proceso';

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
      { columnName: "Usuario", by: "usuario", center: false },
      { columnName: "Macroproceso", by: "macroprocesoNombre", center: false },
      { columnName: "Proceso", by: "procesoNombre", center: false },
      { columnName: "Riesgo", by: "riesgo", center: false },
      { columnName: "Implicación de riesgo", by: "implicacionRiesgo", center: false },
      { columnName: "Prob. de ocurrencia", by: "probabilidadOcurrencia", center: false },
      { columnName: "Impacto", by: "impacto", center: false },
      { columnName: "Desc. control / Mit. existente", by: "descripcion", center: false },
      { columnName: "Rec. mejora sugerida", by: "mejora", center: false },
      { columnName: "Creado por", by: "usuario_creacion", center: false },
      { columnName: "Creado el", by: "fecha_creacion", center: false },
      { columnName: "Modificado por", by: "usuario_modificacion", center: false },
      { columnName: "Modificado el", by: "fecha_modificacion", center: false },
      { columnName: "Acciones", by: null, center: false },
    ];
    this.tableManager.init(this.headers, 13, "DESC");
  }

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
      nombre: "Rara vez"
    },
    {
      nombre: "Puede ocurrir"
    },
    {
      nombre: "Muy frecuente"
    }

  ]
  I = [
    {
      nombre: "Leve",
      badge: "badge badge-success"
    },
    {
      nombre: "Moderado",
      badge: "badge badge-warning"
    },
    {
      nombre: "Muy grave",
      badge: "badge badge-danger"
    }
  ]
  Iparser = {
    "Leve":"badge badge-success",
    "Moderado":"badge badge-warning",
    "Muy grave":"badge badge-danger"
  }
  ngOnInit(): void {
    this.get(1);
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

  // ADD
  apAdd: Autoevaluacion = new Autoevaluacion();
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
}
