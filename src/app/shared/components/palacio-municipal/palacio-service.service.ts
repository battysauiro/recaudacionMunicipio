import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Municipio } from './municipio';
import { Palaciomunicipal } from './palaciomunicipal';

@Injectable({
  providedIn: 'root'
})
export class PalacioServiceService {

  private baseURL="http://localhost:8080/api/palacioMunicipal";
  private baseURLM="http://localhost:8080/api/municipios";
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

    ObtenerListaPalacios(pageNo:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
  
        map((response:any)=>{
          
          console.log(response.contenido);
          return response
        }))
      }

      ObtenerListaMunicipios():Observable<Municipio[]>{
        return this.httpClient.get<Municipio[]>(`${this.baseURLM}`,{headers:this.agregarAuthorizationHeader()})
        }
 
    crearPalacioMunicipal(palacio:Palaciomunicipal):Observable<Palaciomunicipal>{
      return this.httpClient.post<Palaciomunicipal>(`${this.baseURL}`,palacio,{headers:this.agregarAuthorizationHeader()}).pipe(
        catchError(e=>{
          if(e.status==302){
            this.alertService.error('YA EXISTE UNA CUENTA CON ESTE MUNICIPIO', this.options);
          }
          return throwError(e);
        })
      ); 
    }
    subirFoto(archivo:File,idpalacio):Observable<Palaciomunicipal>{
      let formData = new FormData();
      formData.append("archivo",archivo);
      formData.append("idPalacio",idpalacio);
      let httpHeaders = new HttpHeaders();
      let token = this.authService.token;
      if(token!=null){
        httpHeaders=httpHeaders.append('Authorization','Bearer '+token)
      }
      return this.httpClient.post(`${this.baseURL}/upload`,formData,{headers:httpHeaders}).pipe(
        map((response: any)=> response.palacio as Palaciomunicipal)
        
      );
    }

    ObtenerPalacioMunicipal(id):Observable<Palaciomunicipal>{
      return this.httpClient.get<Palaciomunicipal>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }

    update(palacio:Palaciomunicipal):Observable<Palaciomunicipal>{
      return this.httpClient.put<Palaciomunicipal>(`${this.baseURL}/${palacio.id}`,palacio,{headers:this.agregarAuthorizationHeader()});
    } 


    delete(id:number):Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
    }
}
