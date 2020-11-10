import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Host } from './host';

@Injectable({
  providedIn: 'root'
})
export class AutoevaluacionAPI {

  constructor(private http: HttpClient) { }

  get(params):Observable<any>{
    const perPage = params.can;
    let offset = params.page * perPage - perPage;
    let httpParams = new HttpParams();
    httpParams = httpParams.append("limit", perPage.toString());
    httpParams = httpParams.append("offset", offset.toString());
    httpParams = httpParams.append("page", params.page.toString());
    httpParams = httpParams.append("cantidad", params.can.toString());
    httpParams = httpParams.append("by", params.by.toString());
    httpParams = httpParams.append("order", params.dir.toString());

    if(params.filters?.buscar != null){
      let value = params.filters.buscar;
      let filters = `id like '%${value}%' 
      OR usuario_creacion like '%${value}%'
      OR usuario_modificacion like '%${value}%' 
      OR procesoNombre like '%${value}%' 
      OR riesgoNombre like '%${value}%' 
      OR macroprocesoNombre like '%${value}%' 
      OR riesgoNombre like '%${value}%' 
      OR implicacionRiesgo like '%${value}%' 
      OR probabilidadOcurrenciaNombre like '%${value}%' 
      OR impactoNombre like '%${value}%'
      OR descripcion like '%${value}%' 
      OR mejora like '%${value}%' 
      OR camposPersonalizados like '%${value}%'`;
      httpParams = httpParams.append("whereX", filters);
    }
  
    return this.http.get(`${Host.HOST}/v_ap/listar`, {params: httpParams});
  }

  post(autoevaluacion: any):Observable<any> {
    return this.http.post<any>(`${Host.HOST}/ap/crear`, autoevaluacion);
  }

  put(autoevaluacion: any):Observable<any> {
    return this.http.put<any>(`${Host.HOST}/ap/modificar/${autoevaluacion.id}`, autoevaluacion);
  }

  getById(id):Observable<any> {
    return this.http.get(`${Host.HOST}/ap/listar/${id}`);
  }

  delete(id):Observable<any> {
    return this.http.delete(`${Host.HOST}/ap/listar/${id}`);
  }
}