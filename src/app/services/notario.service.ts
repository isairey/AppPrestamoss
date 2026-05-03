import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Notario } from '../models/notarios.models';

@Injectable({
  providedIn: 'root'
})
export class NotarioService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  listarPagina():Observable<any>{
    return this._http.get(this.url + 'abogadosNotarios/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarNotario(id):Observable<any>{
    return this._http.get(this.url + 'abogadosNotarios/read?empresa=1&codigo='+id);
  }

  eliminarNotario(id):Observable<any>{
    return this._http.delete(this.url + 'abogadosNotarios/delete?empresa=1&codigo='+id);
  }

  actualizarNotario(notario: Notario):Observable<any>{
    var params = JSON.stringify(notario)
    return this._http.put(this.url + 'abogadosNotarios/update', params, {headers: this.headers});
  }

  crearNotario(notario: Notario):Observable<any>{
    var params = JSON.stringify(notario)
    return this._http.post(this.url + 'abogadosNotarios/create', params, {headers: this.headers});
  }
}
