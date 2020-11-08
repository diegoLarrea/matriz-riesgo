import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Autoevaluacion } from 'src/_models/autoevaluacion';
import { AutoevaluacionAPI } from 'src/_services/autoevaluacion.service';
import { TableMaganer } from 'src/_utils/table';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-autoevaluacion-procesos',
  templateUrl: './autoevaluacion-procesos.component.html',
  styleUrls: ['./autoevaluacion-procesos.component.scss']
})
export class AutoevaluacionProcesosComponent implements OnInit {

  constructor(private toast: ToastrService, 
    private ngxService: NgxUiLoaderService, 
    private apiAutoevaluacion: AutoevaluacionAPI,
    private dp: DatePipe) {
    this.headers = [
      { columnName: "ID", by: "id", center: true },
      { columnName: "Fecha", by: "fecha_creacion", center: false },
      { columnName: "Usuario", by: "usuario", center: false },
      { columnName: "Macroproceso", by: "macroProceso", center: false },
      { columnName: "Proceso", by: "proceso", center: false },
      { columnName: "Riesgo", by: "riesgo", center: false },
      { columnName: "Implicación de riesgo", by: "implicacionRiesgo", center: false },
      { columnName: "Prob. de ocurrencia", by: "probabilidadOcurrencia", center: false },
      { columnName: "Impacto", by: "fechaIngreso", center: false },
      { columnName: "Desc. control / Mit. existente", by: "descripcion", center: false },
      { columnName: "Rec. mejora sugerida", by: "recomendacion", center: false },
      { columnName: "Acciones", by: null, center: false },
    ];
    this.tableManager.init(this.headers, 1, "ASC");
  }

  headers = null;
  tableManager = new TableMaganer();
  datos: Autoevaluacion[] = [];
  filtros = {
    buscar: null
  };
  p: number = 1;
  total: number = 0;
  loading = true;

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
}
