import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo:String ="Iniciar Sesion";
  usuario:Usuario;
  constructor(private authService:AuthService,private router:Router) {
    this.usuario= new Usuario();
   }
  
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal({
        title: 'Ya Has iniciado Sesion',
        text: `¿${this.authService.usuario.username} le gustaria cerrar Session?!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, cerrar session!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.authService.logout();
        }
        else{
          this.router.navigate(['/inicio']);
        } 
      })
    }
  }

  login():void{
    console.log(this.usuario);
    if(this.usuario.username==null || this.usuario.password==null){
      swal('Error de Login','usuario o nombre vacios!','error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response=>{
      console.log(response);
      //let payLoad=JSON.parse(atob(response.access_token.split(".")[1]));
      //console.log(payLoad);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario=this.authService.usuario;
      this.router.navigate(['/inicio']);
      swal('Login',`Hola ${usuario.username}, has iniciado sesión con exito!`,'success');
    },err=>{
      if(err.status==400){
        swal('Error de Login','usuario o contraseña Incorrectos!','error');
      }
    }
    );
  }

}
