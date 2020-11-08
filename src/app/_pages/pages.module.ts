import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AutoevaluacionProcesosComponent } from './autoevaluacion-procesos/autoevaluacion-procesos.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MacroprocesosComponent } from './macroprocesos/macroprocesos.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { RiesgosComponent } from './riesgos/riesgos.component';

@NgModule({
  declarations: [PagesComponent,
    AutoevaluacionProcesosComponent,
    MacroprocesosComponent,
    ProcesosComponent,
    RiesgosComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    NgxPaginationModule,
    FormsModule,
    PagesRoutingModule
  ],
  providers: [
    DatePipe
  ]
})
export class PagesModule { }
