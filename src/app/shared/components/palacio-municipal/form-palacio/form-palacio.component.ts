import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'app/alerts/alert.service';
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
  fotoSeleccionada: File;
  titulo:string ="AGREGAR PALACIO MUNICIPAL";
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private palacioService:PalacioServiceService,private router:Router,private activatedRouter:ActivatedRoute,
    private alertService:AlertService) { } 

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
        this.titulo="ACTUALIZAR PALACIO MUNICIPAL";
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
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.clave===o2.clave;
  }
 
  public vacio(){
    if(this.palacioM.telefono==null || this.palacioM.telefono=="" ||
      this.palacioM.municipio==null ){
        return true;
      }
        else{
          return false; 
        }
  }

  onKey(event: any){
    event.target.value = event.target.value.toUpperCase();
    console.log(event.target.value); 
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
  this.palacioService.subirFoto(this.fotoSeleccionada,this.palacioM.id).subscribe(
    palacio=>{
      this.palacioM=palacio;
      console.log(this.palacioM);
      //this.alertService.success("La foto se ha subido con exito"); 
    }
  );
}
}
