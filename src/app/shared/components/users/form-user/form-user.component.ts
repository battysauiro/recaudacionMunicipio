import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '@shared/components/empleados/empleado';
import { EmpleadosServiceService } from '@shared/components/empleados/empleados-service.service';
import { Rol } from '@shared/components/roles/rol';
import { RolesServiceService } from '@shared/components/roles/roles-service.service';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';
import swal from 'sweetalert2';
import { AlertService } from 'app/alerts/alert.service';

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
  Cpassword:string;
  fotoSeleccionada: File;
  banderaPassword=false;
  mensaje='';
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  titulo="AGREGAR USUARIO";
  constructor(private userService:UserServiceService,
    private rolesService:RolesServiceService,
    private empleadoService:EmpleadosServiceService,
    private router:Router,
    private activatedRouter:ActivatedRoute,
    private alertService:AlertService) { }

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
        this.titulo="ACTUALIZAR USUARIO";
        this.userService.Obtener(id).subscribe(usuario=>{
          usuario.password="";
          this.usuario=usuario})
      }
    });
  }

  public update():void{
    this.userService.update(this.usuario).subscribe(usuario=>{
      this.irUsuarios();   
      swal('Usuario Actualizado',`Usuario ${this.usuario.email} actualizado con éxito`,'success');
    });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image')<0){
      this.alertService.error("Error al seleccionar Imagen: debe ser de tipo imagen",this.options); 
      this.fotoSeleccionada=null;
    }
    else{
      this.subirFoto();
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      this.alertService.error("Error al subir: debe seleccionar una foto",this.options); 
    }else{

    }
    this.userService.subirFoto(this.fotoSeleccionada,this.usuario.email).subscribe(
      usuario=>{
        this.usuario=usuario;
        console.log(this.usuario);
        //this.alertService.success("La foto se ha subido con exito"); 
      }
    );
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

  validarCorreo(){
    let correo=this.usuario.email;
    if(correo===undefined){
      correo="";
    }
    var expCorreo=  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if(correo.match(expCorreo)){
      console.log(true);
      return true;
      
    }else{
    console.log(false);
    return false;
  }
  }

  validarContrasena(event){
    let password=this.usuario.password;
    
    var passw=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/;
    if(password.match(passw)){
      this.banderaPassword=true;
    }else{
    this.banderaPassword=false;}
  }

  compararContrasena(){
    let password=this.usuario.password;
    console.log("esto es lo que contiene el password");
    console.log(password)
    console.log("esto es lo que contiene el password de comparar");
    console.log(this.Cpassword)
    
    if(password===undefined){
      console.log("es undefinidoooooooooooooooooooooooooo");
      return false;
    }

    if(password===""){
      console.log("es vaciooooooooooooooooooooo");
      return false;
    }
    
    
    if(password===this.Cpassword && password.length>8 && this.Cpassword.length >8){
      console.log("esto ya entro");
      return true;
    }
    else{
      return false;
    }
  }

  desactivarImagen(){
    if(!this.compararContrasena() || !this.usuario.id_empleado){
      console.log("entro en desactivar imagen");
      return true;
    }
    else{
      console.log("no entro en desactivar imagen");
      return false;
    }
    
  }

  public vacio(){
    if(this.usuario.email==null || this.usuario.email=="" ||
      this.usuario.id_empleado==null || this.usuario.id_empleado=="" ||
      this.usuario.id_rol==null ||
      this.usuario.password==null || this.usuario.password=="" ||
      this.usuario.password.length <9 || 
      this.Cpassword.length<9 &&
      (!this.compararContrasena())){
        return true;
      }
        else{
          return false; 
        }
  }
}
