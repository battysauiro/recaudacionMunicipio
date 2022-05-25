import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Empleado } from './empleado';
import { EmpleadosServiceService } from './empleados-service.service';
import swal from 'sweetalert2';
import { PalacioMunicipal } from './palacio-municipal';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {
   empleado= new Empleado();
   palacios:PalacioMunicipal[];
  constructor(private empleadoService:EmpleadosServiceService,private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerListaPalaciosM();
    this.cargarEmpleado();
  }

  public create():void{  
    this.empleadoService.crearEmpleado(this.empleado).subscribe(
      response=> {this.empleado=response;
                  this.irEmpleados();
                  swal('Empleado Agregado',`empleado ${this.empleado.nombre} ${this.empleado.apellido_p} ${this.empleado.apellido_m} creado con éxito`,'success');
                }      
    );
  }
  obtenerListaPalaciosM(){
    this.empleadoService.ObtenerListaPalaciosMunicipales().subscribe(
      
      response=> {this.palacios= response 
      }
      
    );;
  }
  cargarEmpleado(){
    this.activatedRouter.params.subscribe(params=>{
      console.log(params)
      let id=params['id'];
      if(id){
        this.empleadoService.ObtenerEmpleado(id).subscribe(empleado=>this.empleado=empleado)
      }
    });
  }

  public update():void{
    this.empleadoService.update(this.empleado).subscribe(empleado=>{
      this.irEmpleados();
      //this.router.navigate(['/inicio/contribuyentes']);
      
      swal('Empleado Actualizado',`Empleado ${empleado.nombre}  ${empleado.apellido_p} ${empleado.apellido_m} actualizado con éxito`,'success');
    });
  }

  irEmpleados(){
    this.router.navigate(['/inicio/empleados']);
  }

  compararPalacio(o1:PalacioMunicipal,o2:PalacioMunicipal){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1==null || o2==null? false:o1.id===o2.id;
  }

}
