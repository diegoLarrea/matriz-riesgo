import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AutoevaluacionProcesosComponent } from './autoevaluacion-procesos/autoevaluacion-procesos.component';


@NgModule({
  declarations: [PagesComponent, AutoevaluacionProcesosComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
