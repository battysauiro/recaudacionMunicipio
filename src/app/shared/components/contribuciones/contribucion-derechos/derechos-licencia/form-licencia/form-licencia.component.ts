import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Catalogo } from '@shared/components/contribuciones/catalogo';
import { ContribucionDerechoslicencia } from '@shared/components/contribuciones/contribucion-derechoslicencia';
import { ContribucionesServiceService } from '@shared/components/contribuciones/contribuciones-service.service';
import { CDerechosLicenciaServiceService } from '@shared/components/contribuciones/servicios/c-derechos-licencia-service.service';
import { TipoPago } from '@shared/components/contribuciones/tipo-pago';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-licencia',
  templateUrl: './form-licencia.component.html',
  styleUrls: ['./form-licencia.component.css']
})
export class FormLicenciaComponent implements OnInit {

  contribucion= new ContribucionDerechoslicencia();
  tipoPagos:TipoPago[];
  descripciones:Catalogo[];
  tDerechos:Catalogo[];
  idFound=false;
  constructor(private contribucionService:ContribucionesServiceService,private router:Router,private activatedRouter:ActivatedRoute,
    private contribucionDLicenciaService:CDerechosLicenciaServiceService) { }

  ngOnInit(): void {
    this.cargarContribucion();
    this.obtenerTipoPago();
    this.obtenerDescripciones();
    this.obtenerTipoDerecho();
  }

  public create():void{  
    this.contribucionDLicenciaService.crearCDerechoLicencia(this.contribucion).subscribe(
      response=> {this.contribucion=response;
                  this.irDerechos();
                  swal('Derecho Licencia Agregado',`Derecho Licencia ${this.contribucion.codigo_contribucion} añadido con éxito`,'success');
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

  cargarContribucion(){
    this.activatedRouter.params.subscribe(params=>{
      console.log(params)
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.contribucionDLicenciaService.ObtenerCDerechoLicencia(id).subscribe(contribucion=>this.contribucion=contribucion)
      }
    });
  }

  public update():void{
    this.contribucionDLicenciaService.update(this.contribucion).subscribe(contribucion=>{
      this.irDerechos(); 
      swal('Derecho Licencia Actualizado',`Derecho Licencia ${contribucion.codigo_contribucion} actualizado con éxito`,'success');
    });
  }

  irDerechos(){
    this.router.navigate(['/derechosLicencia']);
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

  public vacio(){
    if(this.contribucion.codigo_contribucion==null || this.contribucion.codigo_contribucion=="" ||
      this.contribucion.concepto_contribucion==null || this.contribucion.concepto_contribucion=="" ||
      this.contribucion.id_tipo_pago==null ||
      this.contribucion.id_descripcion==null ||
      this.contribucion.catalogo_derechos==null){
        return true;
      }
        else{
          return false; 
        }
  }
}
