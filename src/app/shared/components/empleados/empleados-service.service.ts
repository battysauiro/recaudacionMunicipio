import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable,throwError } from 'rxjs';
import { map ,catchError} from 'rxjs/operators';
import { Empleado } from './empleado';
import { PalacioMunicipal } from './palacio-municipal';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosServiceService {
  private baseURL="http://localhost:8080/api/empleado";
  private baseURLP="http://localhost:8080/api/palacioMunicipal";
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

  ObtenerListaPalaciosMunicipales():Observable<PalacioMunicipal[]>{
    return this.httpClient.get<PalacioMunicipal[]>(`${this.baseURLP}`,{headers:this.agregarAuthorizationHeader()})
    }

    ObtenerListaEmpleados(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido); 
          return response
        }))
      }

      ObtenerListarEmpleados():Observable<Empleado[]>{
        return this.httpClient.get<Empleado[]>(`${this.baseURL}`,{headers:this.agregarAuthorizationHeader()})
        }  

    crearEmpleado(empleado:Empleado):Observable<Empleado>{
      return this.httpClient.post<Empleado>(`${this.baseURL}`,empleado,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e=>{
          if(e.status==302){
            this.alertService.error('YA EXISTE EL EMPLEADO', this.options);
          }
          return throwError(e);
        })
      );
    }

    ObtenerEmpleado(id):Observable<Empleado>{
      return this.httpClient.get<Empleado>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(empleado:Empleado):Observable<Empleado>{
      return this.httpClient.put<Empleado>(`${this.baseURL}/${empleado.curp}`,empleado,{headers:this.agregarAuthorizationHeader()});
    }


    delete(id:string):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}  
