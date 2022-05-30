import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contribucion } from './contribucion';
import { ContribucionAMulta } from './contribucion-amulta';
import { ContribucionAMultaEbriedad } from './contribucion-amulta-ebriedad';
import { ContribucionAMultaVehicular } from './contribucion-amulta-vehicular';
import { ContribucionDerechosGeneral } from './contribucion-derechos-general';
import { ContribucionDerechoslicencia } from './contribucion-derechoslicencia';
import { ContribucionImpuesto } from './contribucion-impuesto';
import { ContribucionOtrosProductos } from './contribucion-otros-productos';
import { CAMultaEbriedadServiceService } from './servicios/c-amulta-ebriedad-service.service';
import { CAprovechamientoMultaServiceService } from './servicios/c-aprovechamiento-multa-service.service';
import { CAprovechamientoVehicularServiceService } from './servicios/c-aprovechamiento-vehicular-service.service';
import { CDerechosGeneralServiceService } from './servicios/c-derechos-general-service.service';
import { CDerechosLicenciaServiceService } from './servicios/c-derechos-licencia-service.service';
import { CImpuestoServiceService } from './servicios/c-impuesto-service.service';
import { COtrosProductosServiceService } from './servicios/c-otros-productos-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-contribuciones',
  templateUrl: './form-contribuciones.component.html',
  styleUrls: ['./form-contribuciones.component.css']
})
export class FormContribucionesComponent implements OnInit {
  tipoContribuciones=["IMPUESTOS","DERECHOS","APROVECHAMIENTO","OTROS PRODUCTOS"];
  contribucion=new Contribucion();
  contribucionImpuesto=new ContribucionImpuesto();
  contribucionDGeneral=new ContribucionDerechosGeneral();
  contribucionDLicencias=new ContribucionDerechoslicencia();
  contribucionAMulta=new ContribucionAMulta();
  contribucionAMultaVehicular=new ContribucionAMultaVehicular();
  contribucionAMultaEbriedad=new ContribucionAMultaEbriedad();
  contribucionOtrosProductos=new ContribucionOtrosProductos();
  idFound=false;
  constructor(private contribucionImpuestoService:CImpuestoServiceService,
    private contribucionDGeneralService:CDerechosGeneralServiceService,
    private contribucionDLicenciaService:CDerechosLicenciaServiceService,
    private contribucionAMultaService:CAprovechamientoMultaServiceService,
    private contribucionAVehicularService:CAprovechamientoVehicularServiceService,
    private contribucionAEbriedadService:CAMultaEbriedadServiceService,
    private contribucionOtrosProductosService:COtrosProductosServiceService,
    private router:Router,private activatedRouter:ActivatedRoute) { }  

  ngOnInit(): void {
    
  }

  public crearContribucion(tipo:string){
    if(tipo==="IMPUESTOS"){
      this.contribucionImpuestoService.crearCImpuesto(this.contribucionImpuesto).subscribe(
        response=> {this.contribucionImpuesto=response;
                    //this.irEmpleados();
                    swal('Contribucion Agregada',`Contribucion ${this.contribucionImpuesto.codigo_contribucion} agregada con éxito`,'success');
                  }      
      );
    }
    else if(tipo==="DERECHOS"){
      this.contribucionImpuestoService.crearCImpuesto(this.contribucionImpuesto).subscribe(
        response=> {this.contribucionImpuesto=response;
                    //this.irEmpleados();
                    swal('Contribucion Agregada',`Contribucion ${this.contribucionImpuesto.codigo_contribucion} agregada con éxito`,'success');
                  }      
      );
    }
  }
  
}
