import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Contribucion } from './contribucion';
import { Contribuciones } from './contribuciones';

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
  }
  

  