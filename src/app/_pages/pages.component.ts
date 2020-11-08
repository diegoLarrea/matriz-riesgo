import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SPINNER } from 'ngx-ui-loader';
import { AuthAPI } from 'src/_services/auth';

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
    }
  ]
}
