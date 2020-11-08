import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Host } from './host';

@Injectable({
  providedIn: 'root'
})
export class MacroprocesoAPI {

  constructor(private http: HttpClient) { }

  get():Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("by", "fecha_modificacion");
    httpParams = httpParams.append("order", "DESC");  
    return this.http.get(`${Host.HOST}/ap_macroproceso/listar`, {params: httpParams});
  }

  post(macroproceso: any):Observable<any> {
    return this.http.post<any>(`${Host.HOST}/ap_macroproceso/crear`, macroproceso);
  }

  put(macroproceso: any):Observable<any> {
    return this.http.put<any>(`${Host.HOST}/ap_macroproceso/modificar/${macroproceso.id}`, macroproceso);
  }

  getById(id):Observable<any> {
    return this.http.get(`${Host.HOST}/ap_macroproceso/listar/${id}`);
  }

  delete(id):Observable<any> {
    return this.http.delete(`${Host.HOST}/ap_macroproceso/listar/${id}`);
  }
  
}