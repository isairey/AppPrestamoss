import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { DiaInhabil } from '../models/dia-inhabil.model';

@Injectable({
  providedIn: 'root'
})
export class DiaInhabilService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  listarPagina(numeroPagina, numeroItems):Observable<any>{
    return this._http.get(this.url + 'diasNoHabilesNoCobroMora/listPage?page='+numeroPagina+'&size='+numeroItems,{headers: this.headers});
  }

  listarDiaInhabil(fechaFeriado, tipoFeriado):Observable<any>{
    return this._http.get(this.url + 'diasNoHabilesNoCobroMora/read?empresa=1&fechaFeriado='+fechaFeriado+'tipoFeriado='+tipoFeriado,{headers: this.headers});
  }

  eliminarDiaInhabil(id):Observable<any>{
    return this._http.delete(this.url + 'diasNoHabilesNoCobroMora/delete?empresa=1&codigo='+id);
  }

  actualizarDiaInhabil(diaInhabil: DiaInhabil):Observable<any>{
    var params = JSON.stringify(diaInhabil)
    return this._http.put(this.url + 'diasNoHabilesNoCobroMora/update', params, {headers: this.headers});
  }

  crearDiaInhabil(diaInhabil: DiaInhabil):Observable<any>{
    var params = JSON.stringify(diaInhabil)
    return this._http.post(this.url + 'diasNoHabilesNoCobroMora/create', params, {headers: this.headers});
  }
}
