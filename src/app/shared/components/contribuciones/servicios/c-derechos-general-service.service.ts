import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContribucionDerechosGeneral } from '../contribucion-derechos-general';

@Injectable({
  providedIn: 'root'
})
export class CDerechosGeneralServiceService {

  private baseURL="http://localhost:8080/api/derechoGeneral";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  
  constructor(private httpClient:HttpClient,private authService:AuthService) { }

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
      return this.httpClient.post<ContribucionDerechosGeneral>(`${this.baseURL}`,derechoG,{headers:this.agregarAuthorizationHeader()});
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
