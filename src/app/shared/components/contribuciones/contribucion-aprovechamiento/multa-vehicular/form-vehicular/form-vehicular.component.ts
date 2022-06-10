import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Catalogo } from '@shared/components/contribuciones/catalogo';
import { ContribucionAMultaVehicular } from '@shared/components/contribuciones/contribucion-amulta-vehicular';
import { ContribucionesServiceService } from '@shared/components/contribuciones/contribuciones-service.service';
import { CAprovechamientoVehicularServiceService } from '@shared/components/contribuciones/servicios/c-aprovechamiento-vehicular-service.service';
import { TipoPago } from '@shared/components/contribuciones/tipo-pago';
import { TipoVehiculo } from '@shared/components/contribuciones/tipo-vehiculo';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-vehicular',
  templateUrl: './form-vehicular.component.html',
  styleUrls: ['./form-vehicular.component.css']
})
export class FormVehicularComponent implements OnInit {
 
  contribucion= new ContribucionAMultaVehicular();
  tipoPagos:TipoPago[];
  descripciones:Catalogo[]; 
  tAprovechamientos:Catalogo[];
  tVehiculos:TipoVehiculo[];
  idFound=false;
  constructor(private contribucionService:ContribucionesServiceService,private router:Router,private activatedRouter:ActivatedRoute,
    private contribucionAVehicularService:CAprovechamientoVehicularServiceService) { }

    ngOnInit(): void {

      this.cargarContribucion();
      this.obtenerTipoPago();
      this.obtenerDescripciones();
      this.obtenerTipoAprovechamiento();
      this.obtenerTipoVehiculo();
    }
  
    public create():void{  
      this.contribucionAVehicularService.crearCMvehicular(this.contribucion).subscribe(
        response=> {this.contribucion=response;
                    this.irAprovechamiento();
                    swal('Multa Vehicular Agregada',`Multa ${this.contribucion.codigo_contribucion} añadida con éxito`,'success');
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

    obtenerTipoVehiculo(){
      this.contribucionService.obtenerTipoVehiculo().subscribe(
        
        response=> {this.tVehiculos= response 
          console.log(this.tVehiculos);
        }
        
      );
    }
    cargarContribucion(){
      this.activatedRouter.params.subscribe(params=>{
        console.log(params)
        let id=params['id'];
        if(id){
          this.idFound=true;
          this.contribucionAVehicularService.ObtenerCMvehicular(id).subscribe(contribucion=>this.contribucion=contribucion)
        }
      });
    }
  
    public update():void{
      this.contribucionAVehicularService.update(this.contribucion).subscribe(contribucion=>{
        this.irAprovechamiento(); 
        swal('Multa Vehicular Actualizada',`Multa ${contribucion.codigo_contribucion} actualizada con éxito`,'success');
      });
    }
  
    irAprovechamiento(){
      this.router.navigate(['/multaVehicular']);
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

    compararTVehiculo(o1:TipoVehiculo,o2:TipoVehiculo){
      if(o1===undefined && o2===undefined){
        return true;
      }
      return o1===null || o2===null || o1===undefined || o2===undefined? false:o1.id_tipo_vehiculo===o2.id_tipo_vehiculo;
    }

    public vacio(){
      if(this.contribucion.codigo_contribucion==null || this.contribucion.codigo_contribucion=="" ||
        this.contribucion.concepto_contribucion==null || this.contribucion.concepto_contribucion=="" ||
        this.contribucion.id_tipo_pago==null ||
        this.contribucion.id_descripcion==null ||
        this.contribucion.id_catalogo==null ||
        this.contribucion.tipo_vehiculo==null ||
        this.contribucion.descripcion_articulo==null || this.contribucion.descripcion_articulo==""){
          return true;
        }
          else{
            return false; 
          }
    }
}
