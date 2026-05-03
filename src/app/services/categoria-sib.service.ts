import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { CategoriaSib } from '../models/categoriaSib.model';

@Injectable()
export class CategoriaSibService {
  public url: string;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listarPagina():Observable<any> {
    return this._http.get(this.url + 'categoria/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers});
  }

  listarCategoria(id):Observable<any>{
    return this._http.get(this.url + 'categoria/read?empresa=1&codigo='+id);
  }

  eliminarCategoria(id):Observable<any>{
    return this._http.delete(this.url + 'categoria/delete?empresa=1&codigo='+id);
  }

  actualizarCategoria(categoria: CategoriaSib):Observable<any>{    
    var params = JSON.stringify(categoria)
    return this._http.put(this.url + 'categoria/update', params, {headers: this.headers});
  }

  crearCategoria(categoria: CategoriaSib):Observable<any>{
    var params = JSON.stringify(categoria)
    return this._http.post(this.url + 'categoria/create', params, {headers: this.headers});
  }
}