import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContribucionDerechosGeneral } from '../contribucion-derechos-general';

@Injectable({
  providedIn: 'root'
})
export class CDerechosGeneralServiceService {

  private baseURL="http://localhost:8080/api/derechoGeneral";
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


    ObtenerListaCDerechoG(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido); 
          return response
        }))
      }

    crearCDerechoG(derechoG:ContribucionDerechosGeneral):Observable<ContribucionDerechosGeneral>{
      return this.httpClient.post<ContribucionDerechosGeneral>(`${this.baseURL}`,derechoG,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e=>{
          if(e.status==302){
            this.alertService.error('YA EXISTE UNA CONTRIBUCION CON ESTA IFORMACION', this.options);
          }
          return throwError(e);
        })
      );
    }

    ObtenerCDerechoG(id):Observable<ContribucionDerechosGeneral>{
      return this.httpClient.get<ContribucionDerechosGeneral>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(derechoG:ContribucionDerechosGeneral):Observable<ContribucionDerechosGeneral>{
      return this.httpClient.put<ContribucionDerechosGeneral>(`${this.baseURL}/${derechoG.codigo_contribucion}`,derechoG,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:string):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
