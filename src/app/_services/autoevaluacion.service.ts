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
    console.log(params)
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
      let filters = `id like '%${value}%' OR usuario like '%${value}%' OR fecha_creacion like '%${value}%' OR macroProceso like '%${value}%' OR proceso like '%${value}%' OR riesgo like '%${value}%' OR implicacionRiesgo like '%${value}%' OR probabilidadOcurrencia like '%${value}%' OR impacto like '%${value}%' OR  descripcion like '%${value}%' OR  mejora like '%${value}%' OR  camposPersonalizados like '%${value}%'`;
      httpParams = httpParams.append("whereX", filters);
    }
  
    return this.http.get(`${Host.HOST}/autoevaluacion_procesos/listar`, {params: httpParams});
  }

  post(autoevaluacion: any):Observable<any> {
    return this.http.post<any>(`${Host.HOST}/autoevaluacion_procesos/crear`, autoevaluacion);
  }

  put(autoevaluacion: any):Observable<any> {
    return this.http.put<any>(`${Host.HOST}/autoevaluacion_procesos/modificar/${autoevaluacion.id}`, autoevaluacion);
  }

  getById(id):Observable<any> {
    return this.http.get(`${Host.HOST}/autoevaluacion_procesos/listar/${id}`);
  }
}