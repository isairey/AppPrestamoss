import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Poder } from '../models/poder.model';

@Injectable()
export class PoderService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listarPagina():Observable<any> {
    return this._http.get(this.url + 'poder/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarPoder(id):Observable<any>{
    return this._http.get(this.url + 'poder/read?empresa=1&codigo='+id);
  }

  eliminarPoder(id):Observable<any>{
    return this._http.delete(this.url + 'poder/delete?empresa=1&codigo='+id);
  }

  actualizarPoder(poder: Poder):Observable<any>{
    var params = JSON.stringify(poder)
    return this._http.put(this.url + 'poder/update', params, {headers: this.headers});
  }

  crearPoder(poder: Poder):Observable<any>{
    var params = JSON.stringify(poder)
    return this._http.post(this.url + 'poder/create', params, {headers: this.headers});
  }

  leerPoder(id):Observable<any>{
    return this._http.get(this.url + 'poder/read?empresa=1&codigo='+ id, {headers: this.headers});
  }
}