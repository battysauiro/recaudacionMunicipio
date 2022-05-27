import { HttpClient, HttpHeaders } from '@angular/common/http';
import localeEs from '@angular/common/locales/es-MX'
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Contribuyente } from './contribuyente';
import { ContribuyenteFisica } from './contribuyente-fisica';
import { ContribuyenteMoral } from './contribuyente-moral';
import swal from 'sweetalert2';
import { formatDate, registerLocaleData } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService {

  private baseURL="http://localhost:8080/api/contribuyenteFisica";
  private baseURLM="http://localhost:8080/api/contribuyenteMoral";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'})
  //@Output() tipoContribuyenteDisparador= new EventEmitter<boolean>();
  private estado:boolean;
  constructor(private httpClient:HttpClient,private authService:AuthService,
    private router:Router) { }
  private agregarAuthorizationHeader(){
    let token= this.authService.token;
    if(token!=null){ 
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
    return this.httpHeaders;
  }
  //obtiene los contribuyentes Fisicas
  ObtenerListaContribuentes(pageNo:number):Observable<any>{
    return this.httpClient.get(`${this.baseURL}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(   
      map((response:any)=>{
        let contribuyentesFisica= response.contenido as ContribuyenteFisica[];
        console.log("vamos a mostrar contribuyentes");
        console.log(contribuyentesFisica);
         contribuyentesFisica.map(contribuyenteFisica=>{
          contribuyenteFisica.fecha=formatDate(contribuyenteFisica.fecha,'dd-MM-yyyy','en-MX');
          //contribuyenteMoral.colonia=contribuyenteMoral.colonia.toUpperCase();
          //contribuyenteMoral;
          response.contenido=contribuyentesFisica;
         });
        return response;
        //return response.contenido;
      }),

      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
      
    );  //null;// retunr of(contribuyentes)  
  }

  //obtiene los contribuyentes Morales
  ObtenerListaContribuentesM(pageNo:number):Observable<any>{
    return this.httpClient.get(`${this.baseURLM}/page/${pageNo}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map(response=>{
        //let contribuyentesMoral= response as ContribuyenteMoral[];
        //return contribuyentesMoral.map(contribuyenteMoral=>{
          //contribuyenteMoral.calle=contribuyenteMoral.calle.toUpperCase();
          //contribuyenteMoral.colonia=contribuyenteMoral.colonia.toUpperCase();
          //contribuyenteMoral;
          return response;
        //});
        //return response;
      })
    );  //null;// retunr of(contribuyentes)  
  }

  crearContribuyenteFisica(contribuyenteFisica:ContribuyenteFisica):Observable<ContribuyenteFisica>{
    return this.httpClient.post<ContribuyenteFisica>(`${this.baseURL}`,contribuyenteFisica,{headers:this.agregarAuthorizationHeader()});
  }
 //agrega un contribuyente Moral
  crearContribuyenteMoral(contribuyenteMoral:ContribuyenteMoral):Observable<ContribuyenteMoral>{
    return this.httpClient.post<ContribuyenteMoral>(`${this.baseURLM}`,contribuyenteMoral,{headers:this.agregarAuthorizationHeader()});
  }

  ObtenerContribuente(id):Observable<ContribuyenteFisica>{
    return this.httpClient.get<ContribuyenteFisica>(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      map(response=>{
        response.fecha=formatDate(response.fecha,'yyyy-MM-dd','en-MX');
        return response;
      })
      
    );
  }
  //obtiene un contribuyente Moral
  ObtenerContribuenteM(id):Observable<ContribuyenteMoral>{
    return this.httpClient.get<ContribuyenteMoral>(`${this.baseURLM}/${id}`,{headers:this.agregarAuthorizationHeader()});
  }

  update(contribuyenteFisica:ContribuyenteFisica):Observable<ContribuyenteFisica>{
    return this.httpClient.put<ContribuyenteFisica>(`${this.baseURL}/${contribuyenteFisica.id_contribuyente_fisica}`,contribuyenteFisica,{headers:this.agregarAuthorizationHeader()});
  }
  //actualiza un contribuyente moral
  updateM(contribuyenteMoral:ContribuyenteMoral):Observable<ContribuyenteMoral>{
    return this.httpClient.put<ContribuyenteMoral>(`${this.baseURLM}/${contribuyenteMoral.id_contribuyente_moral}`,contribuyenteMoral,{headers:this.agregarAuthorizationHeader()});
  }

  delete(id:string):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`,{headers:this.agregarAuthorizationHeader()});
  }
  //eliminar a un contribuyente moral
  deleteM(id:string):Observable<Object>{
    return this.httpClient.delete(`${this.baseURLM}/${id}`,{headers:this.agregarAuthorizationHeader()});
  }

  setTipo(tipo:boolean){
    this.estado=tipo;
  }
  getTipo(){
    return this.estado;
  }
  private isNoAutorizado(e):boolean{
    if(e.status==401){
      if(this.authService.isAuthenticated()){
        this.authService.logout();
        
      }
      this.router.navigate(['/login']);
      return true;
    }
    if(e.status==403){
      console.log("usted entro en el 403");
      swal('Acceso denegado',`${this.authService.usuario.username} no tienes acceso a este recurso`,'warning');
      this.router.navigate(['/inicio/contribuyentes']);
      return true;
    }
    return false;
  }
}
