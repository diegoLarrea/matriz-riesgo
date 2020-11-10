import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { AuthAPI } from 'src/_services/auth';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private apiAuth: AuthAPI, private router: Router, private ngxService: NgxUiLoaderService) { }

  user = JSON.parse(localStorage.getItem("currentUser"));
  SPINNER = SPINNER;  
  ngOnInit(): void {
  }

  logout(){
    this.ngxService.start();
    this.apiAuth.logout().subscribe(
      data => {
        this.ngxService.stop();
        this.router.navigateByUrl('/login');
      }
    )
  }

  items = [
    {
      nombre: "Autoevaluación de procesos",
      icon: "fas fa-home mr-1",
      route: ''
    },
    {
      nombre: "Macroprocesos",
      icon: "fas fa-object-ungroup mr-1",
      route: 'macroprocesos'
    },
    {
      nombre: "Procesos",
      icon: "fas fa-object-group mr-1",
      route: 'procesos'
    },
    {
      nombre: "Riesgos",
      icon: "fas fa-exclamation-circle mr-1",
      route: 'riesgos'
    }
  ]
}
