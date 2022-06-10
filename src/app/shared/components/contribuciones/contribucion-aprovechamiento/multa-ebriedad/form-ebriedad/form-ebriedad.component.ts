import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Catalogo } from '@shared/components/contribuciones/catalogo';
import { ContribucionAMultaEbriedad } from '@shared/components/contribuciones/contribucion-amulta-ebriedad';
import { ContribucionesServiceService } from '@shared/components/contribuciones/contribuciones-service.service';
import { CAMultaEbriedadServiceService } from '@shared/components/contribuciones/servicios/c-amulta-ebriedad-service.service';
import { TipoPago } from '@shared/components/contribuciones/tipo-pago';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-ebriedad',
  templateUrl: './form-ebriedad.component.html',
  styleUrls: ['./form-ebriedad.component.css']
})
export class FormEbriedadComponent implements OnInit {
 
  contribucion= new ContribucionAMultaEbriedad();
  tipoPagos:TipoPago[];
  descripciones:Catalogo[]; 
  tAprovechamientos:Catalogo[];
  idFound=false;
  constructor(private contribucionService:ContribucionesServiceService,private router:Router,private activatedRouter:ActivatedRoute,
    private contribucionAEbriedadService:CAMultaEbriedadServiceService) { }


    ngOnInit(): void {

      this.cargarContribucion();
      this.obtenerTipoPago();
      this.obtenerDescripciones();
      this.obtenerTipoAprovechamiento();
    }
  
    public create():void{  
      this.contribucionAEbriedadService.crearCMebriedad(this.contribucion).subscribe(
        response=> {this.contribucion=response;
                    this.irAprovechamiento();
                    swal('Multa Ebriedad Agregada',`Multa ${this.contribucion.codigo_contribucion} añadida con éxito`,'success');
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
          this.contribucionAEbriedadService.ObtenerCMebriedad(id).subscribe(contribucion=>this.contribucion=contribucion)
        }
      });
    }
  
    public update():void{
      this.contribucionAEbriedadService.update(this.contribucion).subscribe(contribucion=>{
        this.irAprovechamiento(); 
        swal('Multa Ebriedad Actualizada',`Multa Ebriedad ${contribucion.codigo_contribucion} actualizada con éxito`,'success');
      });
    }
  
    irAprovechamiento(){
      this.router.navigate(['/multaEbriedad']);
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
