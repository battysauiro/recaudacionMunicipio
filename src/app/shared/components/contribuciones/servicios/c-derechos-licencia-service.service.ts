import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContribucionDerechoslicencia } from '../contribucion-derechoslicencia';

@Injectable({
  providedIn: 'root'
})
export class CDerechosLicenciaServiceService {

  private baseURL="http://localhost:8080/api/derechoLicencias";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private httpClient:HttpClient,private authService:AuthService,
    private alertService:AlertService) { }

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
      return this.httpClient.post<ContribucionDerechoslicencia>(`${this.baseURL}`,dLicencia,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e=>{
          if(e.status==302){
            this.alertService.error('YA EXISTE UNA CONTRIBUCION CON ESTA IFORMACION', this.options);
          }
          return throwError(e);
        })
      );
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
