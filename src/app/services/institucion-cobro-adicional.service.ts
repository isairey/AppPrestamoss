import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http'
import {GLOBAL} from './global.service'
import { Observable } from 'rxjs';
import { InstitucionCobroAdicional } from '../models/institucion-cobro-adicional.model'

@Injectable()
export class InstitucionCobroAdicionalService {
public url:string;
public headers = new HttpHeaders().set('Content-Type', 'application/json');
constructor(private _http:HttpClient) {
  this.url = GLOBAL.url;
 }

 listarPagina():Observable<any>{
   return this._http.get(this.url+'institucionCobroAdicional/listPage?sort=id.codigo,asc&query=id.empresa==1',{headers: this.headers})
 }

 listarInstitucionCobro(id):Observable<any>{
   return this._http.get(this.url+'institucionCobroAdicional/read?empresa=1&codigo='+id)
 }

 eliminarInstitucionCobro(id):Observable<any>{
   return this._http.delete(this.url+'institucionCobroAdicional/delete?empresa=1&codigo='+id)
 }

 actualizarInstitucionCobro(institucion : InstitucionCobroAdicional):Observable<any>{
   var params = JSON.stringify(institucion)
   return this._http.put(this.url+'institucionCobroAdicional/update', params, {headers: this.headers})
 }

 crearInstitucionCobro(institucion : InstitucionCobroAdicional):Observable<any>{
  var params = JSON.stringify(institucion)
  return this._http.post(this.url+'institucionCobroAdicional/create',params,{headers:this.headers})
 }

}