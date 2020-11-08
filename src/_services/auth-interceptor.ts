import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem('token');
    
    if (token) {
      req = req.clone({
        setHeaders: { 
          "X-Auth-Token": token
        }
      });
    }

    return next.handle(req).pipe(
      tap((response) => {
          if(response != null && response instanceof HttpResponse){
              let body = response["body"];
              if(body["estado"] == -1 && body["mensaje"] == 'Forbidden'){
                  this.router.navigateByUrl('/login');
                  localStorage.setItem('sesion', 'N');
              }
              
          }
      })
    );
  }

}