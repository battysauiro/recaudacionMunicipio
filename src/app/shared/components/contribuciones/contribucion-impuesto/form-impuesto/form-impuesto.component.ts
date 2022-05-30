import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalogo } from '../../catalogo';
import { ContribucionImpuesto } from '../../contribucion-impuesto';
import { ContribucionesServiceService } from '../../contribuciones-service.service';
import { CImpuestoServiceService } from '../../servicios/c-impuesto-service.service';
import { TipoPago } from '../../tipo-pago';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-impuesto',
  templateUrl: './form-impuesto.component.html',
  styleUrls: ['./form-impuesto.component.css']
})
export class FormImpuestoComponent implements OnInit { 

  contribucion= new ContribucionImpuesto();
  tipoPagos:TipoPago[];
  descripciones:Catalogo[];
  tImpuestos:Catalogo[];
  idFound=false;
  constructor(private contribucionService:ContribucionesServiceService,private router:Router,private activatedRouter:ActivatedRoute,
    private contribucionImpuestoService:CImpuestoServiceService) { }
 
  ngOnInit(): void {

    this.cargarContribucion();
    this.obtenerTipoPago();
    this.obtenerDescripciones();
    this.obtenerTipoImpuesto();
  }

  public create():void{  
    this.contribucionImpuestoService.crearCImpuesto(this.contribucion).subscribe(
      response=> {this.contribucion=response;
                  this.irImpuestos();
                  swal('Impuesto Agregado',`Impuesto ${this.contribucion.codigo_contribucion} añadido con éxito`,'success');
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

  obtenerTipoImpuesto(){
    this.contribucionService.obtenerCatalogoImpuesto().subscribe(
      
      response=> {this.tImpuestos= response 
        console.log(this.tImpuestos);
      }
      
    );
  }
  cargarContribucion(){
    this.activatedRouter.params.subscribe(params=>{
      console.log(params)
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.contribucionImpuestoService.ObtenerCImpuesto(id).subscribe(contribucion=>this.contribucion=contribucion)
      }
    });
  }

  public update():void{
    this.contribucionImpuestoService.update(this.contribucion).subscribe(contribucion=>{
      this.irImpuestos(); 
      swal('Impuesto Actualizado',`Impuesto ${contribucion.codigo_contribucion} actualizado con éxito`,'success');
    });
  }

  irImpuestos(){
    this.router.navigate(['/impuestos']);
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

  compararTImpuesto(o1:Catalogo,o2:Catalogo){
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_catalogo===o2.id_catalogo;
  }
}
