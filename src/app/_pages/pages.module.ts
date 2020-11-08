import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { PagesComponent } from './pages.component';
import { AutoevaluacionProcesosComponent } from './autoevaluacion-procesos/autoevaluacion-procesos.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MacroprocesosComponent } from './macroprocesos/macroprocesos.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { RiesgosComponent } from './riesgos/riesgos.component';
import { ProcesoPipe } from './procesos/procesos.pipe';
import { RiesgosPipe } from './riesgos/riesgos.pipe';
import { MacroprocesoPipe } from './macroprocesos/macroprocesos.pipe';

@NgModule({
  declarations: [PagesComponent,
    AutoevaluacionProcesosComponent,
    MacroprocesosComponent,
    ProcesosComponent,
    RiesgosComponent,
    RiesgosPipe,
    ProcesoPipe,
    MacroprocesoPipe
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    PagesRoutingModule
  ],
  providers: [
    DatePipe,
    RiesgosPipe,
    ProcesoPipe,
    MacroprocesoPipe
  ]
})
export class PagesModule { }
