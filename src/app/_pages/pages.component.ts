import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAPI } from '../_services/auth';
import { SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private apiAuth: AuthAPI, private router: Router) { }

  user = JSON.parse(localStorage.getItem("currentUser"));
  SPINNER = SPINNER;  
  ngOnInit(): void {
  }

  logout(){
    this.apiAuth.logout().subscribe(
      data => {
        this.router.navigateByUrl('/login')
      }
    )
  }

  items = [
    {
      nombre: "Pág. Principal",
      icon: "fas fa-home mr-2",
      route: ''
    },
    {
      nombre: "Macroprocesos",
      icon: "fas fa-object-ungroup mr-2",
      route: 'macroprocesos'
    },
    {
      nombre: "Procesos",
      icon: "fas fa-object-group mr-2",
      route: 'procesos'
    },
    {
      nombre: "Riesgos",
      icon: "fas fa-exclamation mr-2",
      route: 'riesgos'
    },
    {
      nombre: "Prob. de ocurrencia",
      icon: "fas fa-clipboard-list mr-2",
      route: 'probabilidad-ocurrencia'
    },
    {
      nombre: "Impacto",
      icon: "fas fa-list-ul mr-2",
      route: 'impacto'
    }
  ]
}
