import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { ContribucionAMultaVehicular } from '../../contribucion-amulta-vehicular';
import { CAprovechamientoVehicularServiceService } from '../../servicios/c-aprovechamiento-vehicular-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-multa-vehicular',
  templateUrl: './multa-vehicular.component.html',
  styleUrls: ['./multa-vehicular.component.css']
})
export class MultaVehicularComponent implements OnInit {

  paginador:any; 
  contribuciones:ContribucionAMultaVehicular[];
  pagina=0;
  termVehicular='';
  constructor(private contribucionMVehicularService:CAprovechamientoVehicularServiceService,
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
      this.contribucionMVehicularService.ObtenerListaCMvehicular(page).subscribe(
        
        response=> {this.contribuciones= response.contenido as ContribucionAMultaVehicular[]
          this.paginador=response;
        }
        
      );
    }
  
    eliminarContribucion(contribucion:ContribucionAMultaVehicular){
      swal({
        title: 'Estas seguro?',
        text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.contribucionMVehicularService.delete(contribucion.codigo_contribucion).subscribe(response=>{
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
