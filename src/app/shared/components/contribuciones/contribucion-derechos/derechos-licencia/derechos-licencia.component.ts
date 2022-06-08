import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { ContribucionDerechoslicencia } from '../../contribucion-derechoslicencia';
import { CDerechosLicenciaServiceService } from '../../servicios/c-derechos-licencia-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-derechos-licencia',
  templateUrl: './derechos-licencia.component.html',
  styleUrls: ['./derechos-licencia.component.css']
})
export class DerechosLicenciaComponent implements OnInit {

  paginador:any;  
  contribuciones:ContribucionDerechoslicencia[];
  pagina=0;
  termLicencia='';
  constructor(private contribucionDLicenciaService:CDerechosLicenciaServiceService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService) { }

    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params=>{
        let page:number=+params.get('page');
        if(!page){
          page=0;
        }
        this.pagina=page;
        this.obtenerContribuciones(page);
       }
       );
    }
  
    private obtenerContribuciones(page:number){   
      this.contribucionDLicenciaService.ObtenerListaCDerechoLicencia(page).subscribe(
        
        response=> {this.contribuciones= response.contenido as ContribucionDerechoslicencia[]
          this.paginador=response;
        }
        
      );
    }
  
    eliminarContribucion(contribucion:ContribucionDerechoslicencia){
      swal({
        title: 'Estas seguro?',
        text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.contribucionDLicenciaService.delete(contribucion.codigo_contribucion).subscribe(response=>{
          this.obtenerContribuciones(this.pagina);
            swal(
              'Contribucion Eliminada!',
              `Contribucion ${contribucion.codigo_contribucion} eliminada con éxito`,
              'success'
            )
          });
        } 
      })
    }

}
