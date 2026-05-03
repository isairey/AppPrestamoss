import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { GLOBAL } from './global.service'
import { MedioContacto } from '../models/medioContacto.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediosContactoService {

  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listarPagina(): Observable<any> {
    return this._http.get(this.url + 'medio/listPage?sort=id.codigo,asc&query=id.empresa==1', { headers: this.headers });

  }

  listarMedioContacto(id): Observable<any> {
    return this._http.get(this.url + 'medio/read?empresa=1&codigo=' + id);

  }

  eliminarMedioContacto(id): Observable<any> {
    return this._http.delete(this.url + 'medio/delete?empresa=1&codigo=' + id)
  }

  actualizarMedioContacto(medioContacto: MedioContacto): Observable<any> {
    var params = JSON.stringify(medioContacto)
    return this._http.put(this.url + 'medio/update', params, { headers: this.headers });
  }

  crearMedioContacto(medioContacto: MedioContacto): Observable<any> {
    var params = JSON.stringify(medioContacto)
    return this._http.post(this.url + 'medio/create', params, { headers: this.headers });
  }
}
