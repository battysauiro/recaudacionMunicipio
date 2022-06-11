import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from './usuarios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo="Recaudacion de Ingresos";
  constructor(public authService:AuthService, private router:Router){}
  title = 'recaudacionMunicipioFrontend';
  logout():void{
    swal('Logout',`Hola ${this.authService.usuario.username} has cerrado sesión con éxito`,'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}