import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { CobroAdicional } from '../models/cobro-adicional.model';


@Injectable({
  providedIn: 'root'
})
export class CobroAdicionalService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   listarPagina(numeroPagina, numeroItems):Observable<any>{
    return this._http.get(this.url + 'cobroAdicional/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarCobroAdicional(id):Observable<any>{
    return this._http.get(this.url + 'cobroAdicional/read?empresa=1&codigo='+id);
  }

  eliminarCobroAdicional(id):Observable<any>{
    return this._http.delete(this.url + 'cobroAdicional/delete?empresa=1&codigo='+id);
  }

  actualizarCobroAdicional(cobroAdicional: CobroAdicional):Observable<any>{
    var params = JSON.stringify(cobroAdicional)
    return this._http.put(this.url + 'cobroAdicional/update', params, {headers: this.headers});
  }

  crearCobroAdicional(cobroAdicional: CobroAdicional):Observable<any>{
    var params = JSON.stringify(cobroAdicional)
    return this._http.post(this.url + 'cobroAdicional/create', params, {headers: this.headers});
  }

}
