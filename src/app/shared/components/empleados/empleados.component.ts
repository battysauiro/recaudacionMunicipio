import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { Contribucion } from '../contribuciones/contribucion';
import { Empleado } from './empleado';
import { EmpleadosServiceService } from './empleados-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  paginador:any; 
  empleados:Empleado[]; 
  pagina=0;
  termEmpleado='';
  constructor(private empleadoService:EmpleadosServiceService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerEmpleados(page);
     }
     );
    //this.obtenerEmpleados(0);
  }

  private obtenerEmpleados(page:number){   
    this.empleadoService.ObtenerListaEmpleados(page).subscribe(
      
      response=> {this.empleados= response.contenido as Empleado[]
        this.paginador=response;
      }
      
    );
  }

  eliminarEmpleado(empleado:Empleado){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al empleado  ${empleado.nombre} ${empleado.apellido_p} ${empleado.apellido_m}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.empleadoService.delete(empleado.curp).subscribe(response=>{
        this.obtenerEmpleados(this.pagina);
          swal(
            'Empleado Eliminado!',
            `Empleado ${empleado.nombre} ${empleado.apellido_p} ${empleado.apellido_m} eliminado con éxito`,
            'success'
          )
          
        });
        
  
      } 
    })
  }
}
