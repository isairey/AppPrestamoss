import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Instancia } from '../models/instancia.model';

@Injectable()
export class InstanciaService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listarPagina():Observable<any> {
    return this._http.get(this.url + 'instancias/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarInstancia(id):Observable<any>{
    return this._http.get(this.url + 'instancias/read?empresa=1&codigo='+id);
  }

  eliminarInstancia(id):Observable<any>{
    return this._http.delete(this.url + 'instancias/delete?empresa=1&codigo='+id);
  }

  actualizarInstancia(supervisor: Instancia):Observable<any>{
    var params = JSON.stringify(supervisor)
    return this._http.patch(this.url + 'instancias/update', params, {headers: this.headers});
  }

  crearInstancia(instancia: Instancia):Observable<any>{
    var params = JSON.stringify(instancia)
    return this._http.post(this.url + 'instancias/create', params, {headers: this.headers});
  }

  leerInstancia(id):Observable<any>{
    return this._http.get(this.url + 'instancias/read?empresa=1&codigo='+ id, {headers: this.headers});
  }
}