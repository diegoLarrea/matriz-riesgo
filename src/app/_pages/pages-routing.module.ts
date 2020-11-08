import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoevaluacionProcesosComponent } from './autoevaluacion-procesos/autoevaluacion-procesos.component';
import { MacroprocesosComponent } from './macroprocesos/macroprocesos.component';
import { PagesComponent } from './pages.component';
import { ProcesosComponent } from './procesos/procesos.component';
import { RiesgosComponent } from './riesgos/riesgos.component';
import { 
  AuthGuardService as AuthGuard 
} from 'src/_services/auth-guard';

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
        path: "riesgos",
        component: RiesgosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
