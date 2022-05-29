import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from './rol';

@Injectable({
  providedIn: 'root'
})
export class RolesServiceService {

  private baseURL="http://localhost:8080/api/roles";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private httpClient:HttpClient,private authService:AuthService) { }  

  private agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){ 
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

    ObtenerListaRoles(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido);
          return response
        }))
      }

      ObtenerListaRole():Observable<Rol[]>{
        return this.httpClient.get<Rol[]>(`${this.baseURL}`,{headers:this.agregarAuthorizationHeader()})
        }

    crearRole(role:Rol):Observable<Rol>{
      return this.httpClient.post<Rol>(`${this.baseURL}`,role,{headers:this.agregarAuthorizationHeader()});
    }

    ObtenerRole(id):Observable<Rol>{
      return this.httpClient.get<Rol>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(role:Rol):Observable<Rol>{
      return this.httpClient.put<Rol>(`${this.baseURL}/${role.id_rol}`,role,{headers:this.agregarAuthorizationHeader()});
    } 


    delete(id:number):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
