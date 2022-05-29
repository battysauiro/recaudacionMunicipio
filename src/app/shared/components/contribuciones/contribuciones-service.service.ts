import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Contribucion } from './contribucion';
import { Contribuciones } from './contribuciones';
import { Catalogo } from './catalogo';
import { TipoPago } from './tipo-pago';
import { Periodicidad } from './periodicidad';
import { TipoVehiculo } from './tipo-vehiculo';

@Injectable({
  providedIn: 'root'
})
export class ContribucionesServiceService {
  private baseURL="http://localhost:8080/api/";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private httpClient:HttpClient,private authService:AuthService) { }

  private agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){ 
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

  ObtenerListaContribucionesCompleto(pageNo:number):Observable<any>{
    return this.httpClient.get(`${this.baseURL}contribucion/contribuciones/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(

      map((response:any)=>{
        
        console.log(response.contenido);
        return response
      }))
    }

    obtenerCatalogoDescripcion():Observable<Catalogo[]>{
      return this.httpClient.get<Catalogo[]>(`${this.baseURL}catalogoDescripcion`,{headers:this.agregarAuthorizationHeader()})
    }

    obtenerCatalogoImpuesto():Observable<Catalogo[]>{
      return this.httpClient.get<Catalogo[]>(`${this.baseURL}catalogoImpuesto`,{headers:this.agregarAuthorizationHeader()})
    }

    obtenerCatalogoDerechos():Observable<Catalogo[]>{
      return this.httpClient.get<Catalogo[]>(`${this.baseURL}catalogoDerecho`,{headers:this.agregarAuthorizationHeader()})
    }

    obtenerCatalogoAprovechamiento():Observable<Catalogo[]>{
      return this.httpClient.get<Catalogo[]>(`${this.baseURL}catalogoAprovechamiento`,{headers:this.agregarAuthorizationHeader()})
    }

    obtenerCatalogoOtrosProductos():Observable<Catalogo[]>{
      return this.httpClient.get<Catalogo[]>(`${this.baseURL}catalogoOtrosProductos`,{headers:this.agregarAuthorizationHeader()})
    }

    obtenerTipoPago():Observable<TipoPago[]>{
      return this.httpClient.get<TipoPago[]>(`${this.baseURL}tipoPago`,{headers:this.agregarAuthorizationHeader()})
    }

    obtenerPeriodicidad():Observable<Periodicidad[]>{
      return this.httpClient.get<Periodicidad[]>(`${this.baseURL}periodicidad`,{headers:this.agregarAuthorizationHeader()})
    }

    obtenerTipoVehiculo():Observable<TipoVehiculo[]>{
      return this.httpClient.get<TipoVehiculo[]>(`${this.baseURL}tipoVehiculo`,{headers:this.agregarAuthorizationHeader()})
    }
  
}
  

  