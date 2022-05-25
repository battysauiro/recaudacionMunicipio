import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public authService:AuthService,private router:Router) { }
  logout():void{
    swal('Logout',`Hola ${this.authService.usuario.username} has cerrado sesión con éxito`,'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
  }

}
