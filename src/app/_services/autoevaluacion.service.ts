import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoevaluacionAPI {

  constructor(private http: HttpClient) { }

  host = location.protocol == 'https:' ? "https://seguridad.personal.com.py/rLite5":"http://seguridad.personal.com.py/rLite5";
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

    let filters = "";
    let parametros = {};

    if(filters != ""){
      httpParams = httpParams.append("whereX", filters);
    }
  
    return this.http.get(`${this.host}/v_legajo_rrhh/listar`, {params: httpParams});
  }

  post(autoevaluacion: any):Observable<any> {
    return this.http.post<any>(`${this.host}/autoevaluacion_procesos/crear`, autoevaluacion);
  }

  put(autoevaluacion: any):Observable<any> {
    return this.http.put<any>(`${this.host}/autoevaluacion_procesos/modificar/${autoevaluacion.id}`, autoevaluacion);
  }

  getById(id):Observable<any> {
    return this.http.get(`${this.host}/autoevaluacion_procesos/listar/${id}`);
  }
}