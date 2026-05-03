import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Supervisor } from '../models/supervisor.model';

@Injectable()
export class SupervisorService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listarPagina():Observable<any> {
    return this._http.get(this.url + 'supervisor/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarSupervisor(id):Observable<any>{
    return this._http.get(this.url + 'supervisor/read?empresa=1&codigo='+id);
  }

  eliminarSupervisor(id):Observable<any>{
    return this._http.delete(this.url + 'supervisor/delete?empresa=1&codigo='+id);
  }

  actualizarSupervisor(supervisor: Supervisor):Observable<any>{
    var params = JSON.stringify(supervisor)
    return this._http.put(this.url + 'supervisor/update', params, {headers: this.headers});
  }

  crearSupervisor(supervisor: Supervisor):Observable<any>{
    var params = JSON.stringify(supervisor)
    return this._http.post(this.url + 'supervisor/create', params, {headers: this.headers});
  }

  leerSupervisor(id):Observable<any>{
    return this._http.get(this.url + 'supervisor/read?empresa=1&codigo='+ id, {headers: this.headers});
  }
}