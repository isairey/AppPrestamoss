import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Almacenadora } from '../models/almacenadora.model';

@Injectable()
export class AlmacenadoraService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listarPagina():Observable<any> {
    return this._http.get(this.url + 'almacenadoras/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarAlmacenadora(id):Observable<any>{
    return this._http.get(this.url + 'almacenadoras/read?empresa=1&codigo='+id);
  }

  eliminarAlmacenadora(id):Observable<any>{
    return this._http.delete(this.url + 'almacenadoras/delete?empresa=1&codigo='+id);
  }

  actualizarAlmacenadora(almacenadora: Almacenadora):Observable<any>{
    var params = JSON.stringify(almacenadora)
    return this._http.patch(this.url + 'almacenadoras/update', params, {headers: this.headers});
  }

  crearAlmacenadora(almacenadora: Almacenadora):Observable<any>{
    var params = JSON.stringify(almacenadora)
    return this._http.post(this.url + 'almacenadoras/create', params, {headers: this.headers});
  }
}

