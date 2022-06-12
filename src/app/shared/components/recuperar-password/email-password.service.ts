import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CambiarPassword } from './cambiar-password';
import { EmailDTO } from './email-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  private baseURL="http://localhost:8080/api/email/send-html";
  private urlCambiarPassword="http://localhost:8080/api/cambiar-password";
  constructor(private httpClient: HttpClient) { }

  public sendEmail(emailDTO:EmailDTO):Observable<any>{
    return this.httpClient.post<any>(this.baseURL,emailDTO);  
  }

  public cambiarPassword(cambiarPassword:CambiarPassword):Observable<any>{
    return this.httpClient.post<any>(this.urlCambiarPassword,cambiarPassword);  
  }
}
