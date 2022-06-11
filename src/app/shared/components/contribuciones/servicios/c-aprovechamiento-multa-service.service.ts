import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContribucionAMulta } from '../contribucion-amulta';

@Injectable({
  providedIn: 'root'
})
export class CAprovechamientoMultaServiceService {

  private baseURL="http://localhost:8080/api/aprovechamientoMulta";
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


    ObtenerListaCMulta(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido); 
          return response
        }))
      }

    crearCMulta(multa:ContribucionAMulta):Observable<ContribucionAMulta>{
      return this.httpClient.post<ContribucionAMulta>(`${this.baseURL}`,multa,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e=>{
          if(e.status==302){
            this.alertService.error('YA EXISTE UNA CONTRIBUCION CON ESTA INFORMACION', this.options);
          }
          return throwError(e);
        })
      );
    }

    ObtenerCMulta(id):Observable<ContribucionAMulta>{
      return this.httpClient.get<ContribucionAMulta>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(multa:ContribucionAMulta):Observable<ContribucionAMulta>{
      return this.httpClient.put<ContribucionAMulta>(`${this.baseURL}/${multa.codigo_contribucion}`,multa,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:string):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
