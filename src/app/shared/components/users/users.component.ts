import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { User } from './user';
import { UserServiceService } from './user-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  paginador:any; 
  usuarios:User[]; 
  pagina=0;
  termUsuario=''; 
  constructor(private usuarioService:UserServiceService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService,
    private router:Router) { } 

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerUsuarios(page);
     }
     );
  }
 
  private obtenerUsuarios(page:number){   
    this.usuarioService.ObtenerListaUsuarios(page).subscribe(
      
      response=> {
        
        this.usuarios= response.contenido as User[]
        this.paginador=response;
      }
      
    );
  }

  eliminarUsuario(usuario:User){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al Usuario  ${usuario.email}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(usuario.email).subscribe(response=>{
        this.obtenerUsuarios(this.pagina);
          swal(
            'Usuario Eliminado!',
            `Usuario ${usuario.email}  eliminado con éxito`,
            'success'
          )
          
        });
        
  
      } 
    })
  }

  estadoUsuario(estado:boolean){
    console.log(estado);
  }
  onChange(usuario,estado){
    this.update(usuario,estado);
    console.log(usuario+" este es el usuario");
    console.log(estado+" este es el estado");
  }

  public update(usuario,estado){
    this.usuarioService.updateEstado(usuario,estado).subscribe(usuario=>{
      this.obtenerUsuarios(this.pagina);
      this.router.navigate(['/usuario']);
    
    });
  }
}
