import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    let sesion = localStorage.getItem('sesion');
    if ( sesion == null || sesion == 'N') {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}