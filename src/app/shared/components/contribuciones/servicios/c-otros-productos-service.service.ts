import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContribucionOtrosProductos } from '../contribucion-otros-productos';

@Injectable({
  providedIn: 'root'
})
export class COtrosProductosServiceService {

  private baseURL="http://localhost:8080/api/otrosProductos";
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


    ObtenerListaCOtrosProductos(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido); 
          return response
        }))
      }

    crearCOtrosProductos(otroProductos:ContribucionOtrosProductos):Observable<ContribucionOtrosProductos>{
      return this.httpClient.post<ContribucionOtrosProductos>(`${this.baseURL}`,otroProductos,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e=>{
          if(e.status==302){
            this.alertService.error('YA EXISTE UNA CONTRIBUCION CON ESTA INFORMACION', this.options);
          }
          return throwError(e);
        })
      );
    }

    ObtenerCOtrosProductos(id):Observable<ContribucionOtrosProductos>{
      return this.httpClient.get<ContribucionOtrosProductos>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(otroProductos:ContribucionOtrosProductos):Observable<ContribucionOtrosProductos>{
      return this.httpClient.put<ContribucionOtrosProductos>(`${this.baseURL}/${otroProductos.codigo_contribucion}`,otroProductos,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:string):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
