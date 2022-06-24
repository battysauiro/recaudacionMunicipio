import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contribucion } from '@shared/components/contribuciones/contribucion';
import { ContribuyenteFisica } from '@shared/components/contribuyentes/contribuyente-fisica';
import { ContribuyenteMoral } from '@shared/components/contribuyentes/contribuyente-moral';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private urlEndPoint: string ="http://localhost:8080/api/facturas";
  private urlExisteContribucion: string ="http://localhost:8080/api/facturas-contribuyente";
  private urlContribucion: string ="http://localhost:8080/api/contribucion";
  private urlContribuyenteFisica: string ="http://localhost:8080/api/contribuyenteFisica";
  private urlContribuyenteMoral: string ="http://localhost:8080/api/contribuyenteMoral";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private httpCliente: HttpClient,
    private authService:AuthService,
    private alertService:AlertService) { }

  private agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

  getFactura(id:number):Observable<Factura>{
    return this.httpCliente.get<Factura>(this.urlEndPoint+'/'+id);
  }

  filtrarContribucion(term:string):Observable<Contribucion[]>{
    return this.httpCliente.get<Contribucion[]>(this.urlContribucion+'/filtrar/'+term,{headers:this.agregarAuthorizationHeader()});
  }

  filtrarContribuyenteFisica(term:string):Observable<ContribuyenteFisica[]>{
    return this.httpCliente.get<ContribuyenteFisica[]>(this.urlContribuyenteFisica+'/filtrar/'+term,{headers:this.agregarAuthorizationHeader()});
  }

  filtrarContribuyenteMoral(term:string):Observable<ContribuyenteMoral[]>{
    return this.httpCliente.get<ContribuyenteMoral[]>(this.urlContribuyenteMoral+'/filtrar/'+term,{headers:this.agregarAuthorizationHeader()});
  }

  createFactura(factura:Factura): Observable<Factura>{
    return this.httpCliente.post<Factura>(this.urlEndPoint,factura,{headers:this.agregarAuthorizationHeader()}).pipe(
      map(response=>{
        response.fecha=formatDate(response.fecha,'yyyy-MM-dd','en-MX');
        return response;
      })
    );
  }
  //verifica si una contribucion ya ha sido pagada antes por el contribuyente
  existeContribucion(id_contribuyente:string,codigo_contribucion:string):Observable<boolean>{
    return this.httpCliente.get<boolean>(this.urlExisteContribucion+'/'+id_contribuyente+'/'+codigo_contribucion,{headers:this.agregarAuthorizationHeader()});
  }
}
