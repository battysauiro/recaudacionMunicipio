import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Catalogo } from '@shared/components/contribuciones/catalogo';
import { ContribucionDerechosGeneral } from '@shared/components/contribuciones/contribucion-derechos-general';
import { ContribucionesServiceService } from '@shared/components/contribuciones/contribuciones-service.service';
import { Periodicidad } from '@shared/components/contribuciones/periodicidad';
import { CDerechosGeneralServiceService } from '@shared/components/contribuciones/servicios/c-derechos-general-service.service';
import { TipoPago } from '@shared/components/contribuciones/tipo-pago';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-derecho-general',
  templateUrl: './form-derecho-general.component.html',
  styleUrls: ['./form-derecho-general.component.css']
})
export class FormDerechoGeneralComponent implements OnInit {
  
  contribucion= new ContribucionDerechosGeneral();
  tipoPagos:TipoPago[];
  descripciones:Catalogo[];
  tDerechos:Catalogo[];
  periodicidades:Periodicidad[];
  idFound=false;
  
  constructor(private contribucionService:ContribucionesServiceService,private router:Router,private activatedRouter:ActivatedRoute,
    private contribucionDGeneralService:CDerechosGeneralServiceService) { }

  ngOnInit(): void {
    this.cargarContribucion();
    this.obtenerTipoPago();
    this.obtenerDescripciones();
    this.obtenerTipoDerecho();
    this.obtenerPeriodicidad();
  }

  public create():void{  
    this.contribucionDGeneralService.crearCDerechoG(this.contribucion).subscribe(
      response=> {this.contribucion=response;
                  this.irDerechos();
                  swal('Derecho General Agregado',`Derecho General ${this.contribucion.codigo_contribucion} añadido con éxito`,'success');
                }      
    );
  }
  obtenerTipoPago(){
    this.contribucionService.obtenerTipoPago().subscribe(
      
      response=> {this.tipoPagos= response 
        console.log(this.tipoPagos);
      }
      
    );
  }

  obtenerDescripciones(){
    this.contribucionService.obtenerCatalogoDescripcion().subscribe(
      
      response=> {this.descripciones= response 
        console.log(this.descripciones);
      }
      
    );
  }

  obtenerTipoDerecho(){
    this.contribucionService.obtenerCatalogoDerechos().subscribe(
      
      response=> {this.tDerechos= response 
        console.log(this.tDerechos);
      }
      
    );
  }

  obtenerPeriodicidad(){
    this.contribucionService.obtenerPeriodicidad().subscribe(
      
      response=> {this.periodicidades= response 
        console.log(this.periodicidades);
      }
      
    );
  }

  cargarContribucion(){
    this.activatedRouter.params.subscribe(params=>{
      console.log(params)
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.contribucionDGeneralService.ObtenerCDerechoG(id).subscribe(contribucion=>this.contribucion=contribucion)
      }
    });
  }

  public update():void{
    this.contribucionDGeneralService.update(this.contribucion).subscribe(contribucion=>{
      this.irDerechos(); 
      swal('Derecho General Actualizado',`Derecho General ${contribucion.codigo_contribucion} actualizado con éxito`,'success');
    });
  }

  irDerechos(){
    this.router.navigate(['/derechosGeneral']);
  }

  compararPago(o1:TipoPago,o2:TipoPago){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_pago===o2.id_pago;
  }

  compararDescripcion(o1:Catalogo,o2:Catalogo){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_catalogo===o2.id_catalogo;
  }

  compararTDerecho(o1:Catalogo,o2:Catalogo){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_catalogo===o2.id_catalogo;
  }

  compararPeriodicidad(o1:Periodicidad,o2:Periodicidad){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_periodicidad===o2.id_periodicidad;
  }

  public vacio(){
    if(this.contribucion.codigo_contribucion==null || this.contribucion.codigo_contribucion=="" ||
      this.contribucion.concepto_contribucion==null || this.contribucion.concepto_contribucion=="" ||
      this.contribucion.id_tipo_pago==null ||
      this.contribucion.id_descripcion==null ||
      this.contribucion.catalogo_derechos==null ||
      this.contribucion.id_periodicidad==null){
        return true;
      }
        else{
          return false; 
        }
  }

}
