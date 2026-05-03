import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Destino } from '../models/destino.model';

@Injectable()
export class DestinosService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listarPagina(numeroPagina, numeroItems):Observable<any> {
    return this._http.get(this.url + 'destino/listPage?&sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarAlmacenadora(id):Observable<any>{
    return this._http.get(this.url + 'destino/read?empresa=1&codigo='+id);
  }

  eliminarAlmacenadora(id):Observable<any>{
    return this._http.delete(this.url + 'destino/delete?empresa=1&codigo='+id);
  }

  actualizarAlmacenadora(destino: Destino):Observable<any>{
    var params = JSON.stringify(destino)
    return this._http.put(this.url + 'destino/update', params, {headers: this.headers});
  }

  crearAlmacenadora(destino: Destino):Observable<any>{
    var params = JSON.stringify(destino)
    return this._http.post(this.url + 'destino/create', params, {headers: this.headers});
  }
}

