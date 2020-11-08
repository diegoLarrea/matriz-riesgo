import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Host } from './host';

@Injectable({
  providedIn: 'root'
})
export class ProcesoAPI {

  constructor(private http: HttpClient) { }

  get():Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("by", "fecha_modificacion");
    httpParams = httpParams.append("order", "DESC");  
    return this.http.get(`${Host.HOST}/v_ap_proceso/listar`, {params: httpParams});
  }

  post(proceso: any):Observable<any> {
    return this.http.post<any>(`${Host.HOST}/ap_proceso/crear`, proceso);
  }

  put(proceso: any):Observable<any> {
    return this.http.put<any>(`${Host.HOST}/ap_proceso/modificar/${proceso.id}`, proceso);
  }

  getById(id):Observable<any> {
    return this.http.get(`${Host.HOST}/ap_proceso/listar/${id}`);
  }

  delete(id):Observable<any> {
    return this.http.delete(`${Host.HOST}/ap_proceso/listar/${id}`);
  }
  
}