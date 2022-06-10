import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Catalogo } from '@shared/components/contribuciones/catalogo';
import { ContribucionAMulta } from '@shared/components/contribuciones/contribucion-amulta';
import { ContribucionesServiceService } from '@shared/components/contribuciones/contribuciones-service.service';
import { CAprovechamientoMultaServiceService } from '@shared/components/contribuciones/servicios/c-aprovechamiento-multa-service.service';
import { TipoPago } from '@shared/components/contribuciones/tipo-pago';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-multa',
  templateUrl: './form-multa.component.html',
  styleUrls: ['./form-multa.component.css']
})
export class FormMultaComponent implements OnInit {
 
  contribucion= new ContribucionAMulta();
  tipoPagos:TipoPago[];
  descripciones:Catalogo[]; 
  tAprovechamientos:Catalogo[]; 
  idFound=false;
  constructor(private contribucionService:ContribucionesServiceService,private router:Router,private activatedRouter:ActivatedRoute,
    private contribucionAprovechamientoService:CAprovechamientoMultaServiceService) { }

    ngOnInit(): void {

      this.cargarContribucion();
      this.obtenerTipoPago();
      this.obtenerDescripciones();
      this.obtenerTipoAprovechamiento();
    }
  
    public create():void{  
      this.contribucionAprovechamientoService.crearCMulta(this.contribucion).subscribe(
        response=> {this.contribucion=response;
                    this.irAprovechamiento();
                    swal('Multa Agregada',`Multa ${this.contribucion.codigo_contribucion} añadida con éxito`,'success');
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
  
    obtenerTipoAprovechamiento(){
      this.contribucionService.obtenerCatalogoAprovechamiento().subscribe(
        
        response=> {this.tAprovechamientos= response 
          console.log(this.tAprovechamientos);
        }
        
      );
    }
    cargarContribucion(){
      this.activatedRouter.params.subscribe(params=>{
        console.log(params)
        let id=params['id'];
        if(id){
          this.idFound=true;
          this.contribucionAprovechamientoService.ObtenerCMulta(id).subscribe(contribucion=>this.contribucion=contribucion)
        }
      });
    }
  
    public update():void{
      this.contribucionAprovechamientoService.update(this.contribucion).subscribe(contribucion=>{
        this.irAprovechamiento(); 
        swal('Multa Actualizada',`Multa ${contribucion.codigo_contribucion} actualizada con éxito`,'success');
      });
    }
  
    irAprovechamiento(){
      this.router.navigate(['/multa']);
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
  
    compararTAprovechamiento(o1:Catalogo,o2:Catalogo){
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
        this.contribucion.id_catalogo==null){
          return true;
        }
          else{
            return false; 
          }
    }

}
