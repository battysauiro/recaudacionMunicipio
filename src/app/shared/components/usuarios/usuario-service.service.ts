import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioEmpleado } from './usuario-empleado';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private baseURL="http://localhost:8080/api/usuario";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private httpClient:HttpClient,private authService:AuthService) { }

  private agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){ 
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }

  ObtenerListaUsuarios(pageNo:number):Observable<any>{
    return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(

      map((response:any)=>{
        
        console.log(response.contenido);
        return response
      }))
    }

    crearUsuario(usuario:UsuarioEmpleado):Observable<UsuarioEmpleado>{
      return this.httpClient.post<UsuarioEmpleado>(`${this.baseURL}`,usuario,{headers:this.agregarAuthorizationHeader()});
    }

    ObtenerUsuario(id):Observable<UsuarioEmpleado>{
      return this.httpClient.get<UsuarioEmpleado>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(usuario:UsuarioEmpleado):Observable<UsuarioEmpleado>{
      return this.httpClient.put<UsuarioEmpleado>(`${this.baseURL}/${usuario.id_usuario}`,usuario,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:number):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

} 
