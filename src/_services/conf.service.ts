import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Host } from './host';

@Injectable({
  providedIn: 'root'
})
export class ConfAPI {

  constructor(private http: HttpClient) { }

  getImpactos():Observable<any>{  
    return this.http.get(`${Host.HOST}/ap_impacto/listar`);
  }

  getProbOcurrencia():Observable<any>{
    return this.http.get(`${Host.HOST}/ap_p_ocurrencia/listar`);
  }
}