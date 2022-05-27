import { Component } from '@angular/core';
import { AuthService } from './usuarios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo="Recaudacion de Ingresos";
  constructor(public authService:AuthService){}
  title = 'recaudacionMunicipioFrontend';
}
   