import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import {GLOBAL} from './global.service'
import { Aseguradora} from '../models/aseguradora.model'
import { Observable } from 'rxjs';

@Injectable()
export class AseguradoraService {

  public url: String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private _http:HttpClient) {
    this.url = GLOBAL.url
   }

   listarPagina(numeroPagina, numeroItems):Observable<any> {
    return this._http.get(this.url + 'aseguradora/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarAseguradora(id):Observable<any>{
    return this._http.get(this.url+'aseguradora/read?empresa=1&codigo='+id);
  }

  eliminarAseguradora(id):Observable<any>{
    return this._http.delete(this.url+'aseguradora/delete?empresa=1&codigo='+id);
  }

  actualizarAseguradora(aseguradora:Aseguradora):Observable<any>{
    var params = JSON.stringify(aseguradora)
    return this._http.patch(this.url+'aseguradora/update',params,{headers:this.headers})
  }

  crearAseguradora(aseguradora:Aseguradora):Observable<any>{
    var params = aseguradora
    return this._http.post(this.url+'aseguradora/create',params,{headers:this.headers})
  }
}
