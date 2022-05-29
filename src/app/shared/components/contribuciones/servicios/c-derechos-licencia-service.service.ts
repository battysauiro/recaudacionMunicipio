import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContribucionDerechoslicencia } from '../contribucion-derechoslicencia';

@Injectable({
  providedIn: 'root'
})
export class CDerechosLicenciaServiceService {

  private baseURL="http://localhost:8080/api/derechoLicencias";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private httpClient:HttpClient,private authService:AuthService) { }

  private agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){ 
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }


    ObtenerListaCDerechoLicencia(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido); 
          return response
        }))
      }

    crearCDerechoLicencia(dLicencia:ContribucionDerechoslicencia):Observable<ContribucionDerechoslicencia>{
      return this.httpClient.post<ContribucionDerechoslicencia>(`${this.baseURL}`,dLicencia,{headers:this.agregarAuthorizationHeader()});
    }

    ObtenerCDerechoLicencia(id):Observable<ContribucionDerechoslicencia>{
      return this.httpClient.get<ContribucionDerechoslicencia>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(dLicencia:ContribucionDerechoslicencia):Observable<ContribucionDerechoslicencia>{
      return this.httpClient.put<ContribucionDerechoslicencia>(`${this.baseURL}/${dLicencia.codigo_contribucion}`,dLicencia,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:string):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
