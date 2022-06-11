import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContribucionImpuesto } from '../contribucion-impuesto';

@Injectable({
  providedIn: 'root' 
})
export class CImpuestoServiceService {

  private baseURL="http://localhost:8080/api/impuestos";
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


    ObtenerListaCImpuesto(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido); 
          return response
        }))
      }

    crearCImpuesto(impuesto:ContribucionImpuesto):Observable<ContribucionImpuesto>{
      return this.httpClient.post<ContribucionImpuesto>(`${this.baseURL}`,impuesto,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e=>{
          if(e.status==302){
            this.alertService.error('YA EXISTE UNA CONTRIBUCION CON ESTA INFORMACION', this.options);
          }
          return throwError(e);
        })
      );;
    }

    ObtenerCImpuesto(id):Observable<ContribucionImpuesto>{
      return this.httpClient.get<ContribucionImpuesto>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(impuesto:ContribucionImpuesto):Observable<ContribucionImpuesto>{
      return this.httpClient.put<ContribucionImpuesto>(`${this.baseURL}/${impuesto.codigo_contribucion}`,impuesto,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:string):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
