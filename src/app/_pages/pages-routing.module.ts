import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoevaluacionProcesosComponent } from './autoevaluacion-procesos/autoevaluacion-procesos.component';
import { ImpactoComponent } from './impacto/impacto.component';
import { MacroprocesosComponent } from './macroprocesos/macroprocesos.component';
import { PagesComponent } from './pages.component';
import { ProbabilidadOcurrenciaComponent } from './probabilidad-ocurrencia/probabilidad-ocurrencia.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { RiesgosComponent } from './riesgos/riesgos.component';
import { 
  AuthGuardService as AuthGuard 
} from 'src/app/_services/auth-guard';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "autoevaluacion-procesos",
        pathMatch: "full"
      },
      {
        path: "autoevaluacion-procesos",
        component: AutoevaluacionProcesosComponent
      },
      {
        path: "macroprocesos",
        component: MacroprocesosComponent
      },
      {
        path: "procesos",
        component: ProcesosComponent
      },
      {
        path: "probabilidad-ocurrencia",
        component: ProbabilidadOcurrenciaComponent
      },
      {
        path: "riesgos",
        component: RiesgosComponent
      },
      {
        path: "impacto",
        component: ImpactoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
