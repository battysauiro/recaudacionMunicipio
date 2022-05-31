import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Catalogo } from '../../catalogo';
import { ContribucionOtrosProductos } from '../../contribucion-otros-productos';
import { ContribucionesServiceService } from '../../contribuciones-service.service';
import { Periodicidad } from '../../periodicidad';
import { COtrosProductosServiceService } from '../../servicios/c-otros-productos-service.service';
import { TipoPago } from '../../tipo-pago';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-otros-productos',
  templateUrl: './form-otros-productos.component.html',
  styleUrls: ['./form-otros-productos.component.css']
})
export class FormOtrosProductosComponent implements OnInit {
 
  contribucion= new ContribucionOtrosProductos();
  tipoPagos:TipoPago[];
  descripciones:Catalogo[]; 
  tOtrosProductos:Catalogo[];
  periodicidades:Periodicidad[];
  idFound=false;
  constructor(private contribucionService:ContribucionesServiceService,private router:Router,private activatedRouter:ActivatedRoute,
    private contribucionOtrosPService:COtrosProductosServiceService) { }

    ngOnInit(): void {

      this.cargarContribucion();
      this.obtenerTipoPago();
      this.obtenerDescripciones();
      this.obtenerTipoOtrosProductos();
      this.obtenerPeriodicidad();
    }
  
    public create():void{  
      this.contribucionOtrosPService.crearCOtrosProductos(this.contribucion).subscribe(
        response=> {this.contribucion=response;
                    this.irOtrosProductos();
                    swal('Contribucion Agregada',`Contribucion ${this.contribucion.codigo_contribucion} añadida con éxito`,'success');
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
  
    obtenerTipoOtrosProductos(){
      this.contribucionService.obtenerCatalogoOtrosProductos().subscribe(
        
        response=> {this.tOtrosProductos= response 
          console.log(this.tOtrosProductos);
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
          this.contribucionOtrosPService.ObtenerCOtrosProductos(id).subscribe(contribucion=>this.contribucion=contribucion)
        }
      });
    }
  
    public update():void{
      this.contribucionOtrosPService.update(this.contribucion).subscribe(contribucion=>{
        this.irOtrosProductos(); 
        swal('Otros Productos Actualizado',`Otros Productos ${contribucion.codigo_contribucion} actualizado con éxito`,'success');
      });
    }
  
    irOtrosProductos(){
      this.router.navigate(['/otrosProductos']);
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
  
    compararTOtrosP(o1:Catalogo,o2:Catalogo){
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
}
