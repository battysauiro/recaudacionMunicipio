import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContribucionAMulta } from '../contribucion-amulta';

@Injectable({
  providedIn: 'root'
})
export class CAprovechamientoMultaServiceService {

  private baseURL="http://localhost:8080/api/aprovechamientoMulta";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient:HttpClient,private authService:AuthService) { }

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
      return this.httpClient.post<ContribucionAMulta>(`${this.baseURL}`,multa,{headers:this.agregarAuthorizationHeader()});
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
