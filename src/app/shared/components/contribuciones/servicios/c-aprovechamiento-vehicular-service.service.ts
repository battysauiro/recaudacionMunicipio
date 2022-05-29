import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContribucionAMultaVehicular } from '../contribucion-amulta-vehicular';

@Injectable({
  providedIn: 'root'
})
export class CAprovechamientoVehicularServiceService {

  private baseURL="http://localhost:8080/api/multaVehicular";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient:HttpClient,private authService:AuthService) { }

  private agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){ 
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders; 
  }


    ObtenerListaCMvehicular(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido); 
          return response
        }))
      }

    crearCMvehicular(mVehicular:ContribucionAMultaVehicular):Observable<ContribucionAMultaVehicular>{
      return this.httpClient.post<ContribucionAMultaVehicular>(`${this.baseURL}`,mVehicular,{headers:this.agregarAuthorizationHeader()});
    }

    ObtenerCMvehicular(id):Observable<ContribucionAMultaVehicular>{
      return this.httpClient.get<ContribucionAMultaVehicular>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(mVehicular:ContribucionAMultaVehicular):Observable<ContribucionAMultaVehicular>{
      return this.httpClient.put<ContribucionAMultaVehicular>(`${this.baseURL}/${mVehicular.codigo_contribucion}`,mVehicular,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:string):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
