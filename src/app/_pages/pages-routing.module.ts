import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoevaluacionProcesosComponent } from './autoevaluacion-procesos/autoevaluacion-procesos.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        redirectTo: "mis-proyectos",
        pathMatch: "full"
      },
      {
        path: "autoevaluacion-procesos",
        component: AutoevaluacionProcesosComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
