import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { MotivoAjuste } from '../models/motivo-ajuste.model';

@Injectable({
  providedIn: 'root'
})
export class MotivosAjustesService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   listarPagina():Observable<any>{
    return this._http.get(this.url + 'motivoAjuste/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarMotivoAjuste(id):Observable<any>{
    return this._http.get(this.url + 'motivoAjuste/read?empresa=1&codigo='+id);
  }

  eliminarMotivoAjuste(id):Observable<any>{
    return this._http.delete(this.url + 'motivoAjuste/delete?empresa=1&codigo='+id);
  }

  actualizarMotivoAjuste(motivoAjuste: MotivoAjuste):Observable<any>{
    var params = JSON.stringify(motivoAjuste)
    return this._http.put(this.url + 'motivoAjuste/update', params, {headers: this.headers});
  }

  crearMotivoAjuste(motivoAjuste: MotivoAjuste):Observable<any>{
    var params = JSON.stringify(motivoAjuste)
    return this._http.post(this.url + 'motivoAjuste/create', params, {headers: this.headers});
  }

}
