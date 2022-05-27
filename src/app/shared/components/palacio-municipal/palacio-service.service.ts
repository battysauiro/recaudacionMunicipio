import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Palaciomunicipal } from './palaciomunicipal';

@Injectable({
  providedIn: 'root'
})
export class PalacioServiceService {

  private baseURL="http://localhost:8080/api/palacioMunicipal";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient:HttpClient,private authService:AuthService) { }  

  private agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){ 
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

    ObtenerListaPalacios(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido);
          return response
        }))
      }

    crearPalacioMunicipal(palacio:Palaciomunicipal):Observable<Palaciomunicipal>{
      return this.httpClient.post<Palaciomunicipal>(`${this.baseURL}`,palacio,{headers:this.agregarAuthorizationHeader()});
    }

    ObtenerPalacioMunicipal(id):Observable<Palaciomunicipal>{
      return this.httpClient.get<Palaciomunicipal>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(palacio:Palaciomunicipal):Observable<Palaciomunicipal>{
      return this.httpClient.put<Palaciomunicipal>(`${this.baseURL}/${palacio.nombre_municipio}`,palacio,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:number):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
