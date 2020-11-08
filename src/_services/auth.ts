import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Host } from './host'
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthAPI {

  constructor(private http: HttpClient) { }

  login(body):Observable<any>{    
    return this.http.post(`${Host.HOST}/crear/_login`, body);
  }

  logout():Observable<any>{
    localStorage.removeItem('sesion');
    localStorage.removeItem('currentUser');    
    return this.http.get(`${Host.HOST}/listar/_logout`);
  }

  getUser():Observable<any>{    
    return this.http.get(`${Host.HOST}/listar/_user`);
  }

}