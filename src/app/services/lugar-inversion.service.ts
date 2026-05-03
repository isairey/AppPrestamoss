import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http'
import {GLOBAL} from './global.service'
import { Observable } from 'rxjs';
import {LugarInversion} from '../models/lugarInversion.model'

@Injectable()
export class LugarInversionService {
public url:string;
public headers = new HttpHeaders().set('Content-Type', 'application/json');
constructor(private _http:HttpClient) {
  this.url = GLOBAL.url;
 }

 listarPagina():Observable<any>{
   return this._http.get(this.url+'lugar/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers})
 }

 listarLugarInversion(id):Observable<any>{
   return this._http.get(this.url+'lugar/read?empresa=1&codigo='+id)
 }

 eliminarLugarInversion(id):Observable<any>{
   return this._http.delete(this.url+'lugar/delete?empresa=1&codigo='+id)
 }

 actualizarLugarInversion(lugar:LugarInversion):Observable<any>{
   var params = JSON.stringify(lugar)
   return this._http.patch(this.url+'lugar/update', params, {headers: this.headers})
 }

 crearlugarInversion(lugar:LugarInversion):Observable<any>{
  var params = JSON.stringify(lugar)
  return this._http.post(this.url+'lugar/create',params,{headers:this.headers})
 }

}
