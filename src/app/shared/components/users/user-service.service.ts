import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable, throwError } from 'rxjs';
import { map , catchError} from 'rxjs/operators';
import { Empleado } from '../empleados/empleado';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseURL="http://localhost:8080/api/usuario";
  private baseURLE="http://localhost:8080/api/empleado";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  
  constructor(private httpClient:HttpClient,private authService:AuthService,
    private alertService:AlertService) { } 

    options = { 
      autoClose: true,
      keepAfterRouteChange: false
    };
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
           //let usuario= response as User[];
           //return usuario.map(usuario=>{
             
            //usuario.estado=contribuyenteMoral.calle.toUpperCase();
          //contribuyenteMoral.colonia=contribuyenteMoral.colonia.toUpperCase();
          //contribuyenteMoral;
          console.log(response.contenido);
          return response
        }))
      }

      ObtenerListaEmpleados():Observable<Empleado[]>{
        return this.httpClient.get<Empleado[]>(`${this.baseURLE}`,{headers:this.agregarAuthorizationHeader()})
        } 

    crearUsuario(usuario:User):Observable<User>{
      return this.httpClient.post<User>(`${this.baseURL}`,usuario,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e=>{
          if(e.status==302){
            this.alertService.error('YA EXISTE UN CORREO ASOCIADO', this.options);
          }
          return throwError(e);
        })
      );
    }

    Obtener(id):Observable<User>{
      return this.httpClient.get<User>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(usuario:User):Observable<User>{
      return this.httpClient.put<User>(`${this.baseURL}/${usuario.email}`,usuario,{headers:this.agregarAuthorizationHeader()});
    }

    updateEstado(usuario:User,estado:boolean):Observable<User>{
      return this.httpClient.put<User>(`${this.baseURL}/${usuario.email}/${estado}`,usuario,{headers:this.agregarAuthorizationHeader()});
    } 

    subirFoto(archivo:File,username):Observable<User>{
      let formData = new FormData();
      formData.append("archivo",archivo);
      formData.append("username",username);
      let httpHeaders = new HttpHeaders();
      let token = this.authService.token;
      if(token!=null){
        httpHeaders=httpHeaders.append('Authorization','Bearer '+token)
      }
      return this.httpClient.post(`${this.baseURL}/upload`,formData,{headers:httpHeaders}).pipe(
        map((response: any)=> response.usuario as User)
        
      );
    }
 
    delete(id:string):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
