import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { EstatusAvaluos } from '../models/estatus-avaluos.model';

@Injectable()
export class EstatusAvaluosService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listarPagina():Observable<any> {
    return this._http.get(this.url + 'estatusAvaluo/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarEstatusAvaluos(id):Observable<any>{
    return this._http.get(this.url + 'estatusAvaluo/read?empresa=1&codigo='+id);
  }

  eliminarEstatusAvaluos(id):Observable<any>{
    return this._http.delete(this.url + 'estatusAvaluo/delete?empresa=1&codigo='+id);
  }

  actualizarEstatusAvaluos(estatus: EstatusAvaluos):Observable<any>{
    var params = JSON.stringify(estatus)
    return this._http.put(this.url + 'estatusAvaluo/update', params, {headers: this.headers});
  }

  crearEstatusAvaluos(estatus: EstatusAvaluos):Observable<any>{
    var params = JSON.stringify(estatus)
    return this._http.post(this.url + 'estatusAvaluo/create', params, {headers: this.headers});
  }
}