import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { OrigenFondos } from '../models/origen-fondos.model';

@Injectable()
export class OrigenFondosService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listarPagina():Observable<any> {
    return this._http.get(this.url + 'origenDeFondosService/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarAlmacenadora(id):Observable<any>{
    return this._http.get(this.url + 'origenDeFondosService/read?empresa=1&codigo='+id);
  }

  eliminarAlmacenadora(id):Observable<any>{
    return this._http.delete(this.url + 'origenDeFondosService/delete?empresa=1&codigo='+id);
  }

  actualizarAlmacenadora(origenFondos: OrigenFondos):Observable<any>{
    var params = JSON.stringify(origenFondos)
    return this._http.put(this.url + 'origenDeFondosService/update', params, {headers: this.headers});
  }

  crearAlmacenadora(origenFondos: OrigenFondos):Observable<any>{
    var params = JSON.stringify(origenFondos)
    return this._http.post(this.url + 'origenDeFondosService/create', params, {headers: this.headers});
  }
}

