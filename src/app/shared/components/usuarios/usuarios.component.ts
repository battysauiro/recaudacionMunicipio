import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { UsuarioEmpleado } from './usuario-empleado';
import { UsuarioServiceService } from './usuario-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  paginador:any; 
  usuarios:UsuarioEmpleado[];
  pagina=0;
  constructor(private usuarioService:UsuarioServiceService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService) { }

  ngOnInit(): void {
  }

  private obtenerUsuarios(page:number){   
    this.usuarioService.ObtenerListaUsuarios(page).subscribe(
      
      response=> {this.usuarios= response.contenido as UsuarioEmpleado[]
        this.paginador=response;
      }
      
    );
  }



}
