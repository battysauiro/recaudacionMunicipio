import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '@shared/components/empleados/empleado';
import { EmpleadosServiceService } from '@shared/components/empleados/empleados-service.service';
import { Rol } from '@shared/components/roles/rol';
import { RolesServiceService } from '@shared/components/roles/roles-service.service';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  usuario= new User();
  roles:Rol[];
  empleados:Empleado[];
  idFound=false;
  constructor(private userService:UserServiceService,
    private rolesService:RolesServiceService,
    private empleadoService:EmpleadosServiceService,
    private router:Router,
    private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.obtenerListaRoles();
    this.obtenerListaEmpleados();
  }

  public create():void{ 
    
    this.userService.crearUsuario(this.usuario).subscribe(
      response=> {this.usuario=response;
                 
                  this.irUsuarios();
                  swal('Usuario Agregado',`Usuario ${this.usuario.email} creado con éxito`,'success');
                }      
    );
  }
  obtenerListaRoles(){
    this.rolesService.ObtenerListaRole().subscribe(
      response=> {this.roles= response 
        console.log(this.roles); 
      }
    );
  }

  obtenerListaEmpleados(){
    this.empleadoService.ObtenerListarEmpleados().subscribe(
      response=> {this.empleados= response 
        console.log(this.empleados); 
      }
    );
  }
  cargarUsuarios(){
    this.activatedRouter.params.subscribe(params=>{
      console.log(params)
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.userService.Obtener(id).subscribe(usuario=>this.usuario=usuario)
      }
    });
  }

  public update():void{
    this.userService.update(this.usuario).subscribe(usuario=>{
      this.irUsuarios();   
      swal('Usuario Actualizado',`Usuario ${this.usuario.email} actualizado con éxito`,'success');
    });
  }

  irUsuarios(){
    this.router.navigate(['/usuario']);
  }

  compararRoles(o1:Rol,o2:Rol){
    if(o1===undefined && o2===undefined){
      console.log("anda aqui en el comparar");
      return true;
    }
    console.log(o2+" obj 2")
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_rol===o2.id_rol;
  }

  compararEmpleados(o1:Empleado,o2:Empleado){
    if(o1===undefined && o2===undefined){
      console.log("anda aqui en el comparar");
      return true;
    }
    console.log(o2+" obj 2")
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.curp===o2.curp;
  }

}
