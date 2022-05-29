import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Municipio } from '../municipio';
import { PalacioServiceService } from '../palacio-service.service';
import { Palaciomunicipal } from '../palaciomunicipal';

@Component({
  selector: 'app-form-palacio',
  templateUrl: './form-palacio.component.html',
  styleUrls: ['./form-palacio.component.css']
})
export class FormPalacioComponent implements OnInit {
  
  palacioM= new Palaciomunicipal();
  municipios:Municipio[];
  idFound=false;
  constructor(private palacioService:PalacioServiceService,private router:Router,private activatedRouter:ActivatedRoute) { } 

  ngOnInit(): void {
    this.cargarPalacioM();
    this.obtenerListaMunicipios();
  }
 
  public create():void{ 
    
    this.palacioService.crearPalacioMunicipal(this.palacioM).subscribe(
      response=> {this.palacioM=response;
                 
                  this.irPalacios();
                  swal('Palacio Municipal Agregado',`Palacio Municipal  creado con éxito`,'success');
                }      
    );
  }
  obtenerListaMunicipios(){
    this.palacioService.ObtenerListaMunicipios().subscribe(
      
      response=> {this.municipios= response 
        console.log(this.municipios); 
      }
      
    );
  }
  cargarPalacioM(){
    this.activatedRouter.params.subscribe(params=>{
      console.log(params)
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.palacioService.ObtenerPalacioMunicipal(id).subscribe(palacioM=>this.palacioM=palacioM)
      }
    });
  }

  public update():void{
    this.palacioService.update(this.palacioM).subscribe(palacio=>{
      this.irPalacios();
      //this.router.navigate(['/inicio/contribuyentes']);
      
      swal('Palacio Municipal Actualizado',`Palacio Municipal   actualizado con éxito`,'success');
    });
  }

  irPalacios(){
    this.router.navigate(['/palacioMunicipal']);
  }

  compararPalacio(o1:Municipio,o2:Municipio){
    if(o1===undefined && o2===undefined){
      console.log("anda aqui en el comparar");
      return true;
    }
    console.log(o2+" obj 2")
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.clave===o2.clave;
  }

}
