import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContribucionAMultaEbriedad } from '../contribucion-amulta-ebriedad';

@Injectable({
  providedIn: 'root'
})
export class CAMultaEbriedadServiceService {

  private baseURL="http://localhost:8080/api/multaEbriedad";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient:HttpClient,private authService:AuthService) { }

  private agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){ 
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders; 
  }


    ObtenerListaCMebriedad(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido); 
          return response
        }))
      }

    crearCMebriedad(mEbriedad:ContribucionAMultaEbriedad):Observable<ContribucionAMultaEbriedad>{
      return this.httpClient.post<ContribucionAMultaEbriedad>(`${this.baseURL}`,mEbriedad,{headers:this.agregarAuthorizationHeader()});
    }

    ObtenerCMebriedad(id):Observable<ContribucionAMultaEbriedad>{
      return this.httpClient.get<ContribucionAMultaEbriedad>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(mEbriedad:ContribucionAMultaEbriedad):Observable<ContribucionAMultaEbriedad>{
      return this.httpClient.put<ContribucionAMultaEbriedad>(`${this.baseURL}/${mEbriedad.codigo_contribucion}`,mEbriedad,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:string):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
