import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { ContribucionAMulta } from '../../contribucion-amulta';
import { CAMultaEbriedadServiceService } from '../../servicios/c-amulta-ebriedad-service.service';
import swal from 'sweetalert2';
import { CAprovechamientoMultaServiceService } from '../../servicios/c-aprovechamiento-multa-service.service';

@Component({
  selector: 'app-multa',
  templateUrl: './multa.component.html',
  styleUrls: ['./multa.component.css']
})
export class MultaComponent implements OnInit {
 
  paginador:any;   
  contribuciones:ContribucionAMulta[];
  pagina=0;
  constructor(private contribucionMultaService:CAprovechamientoMultaServiceService,
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
      this.contribucionMultaService.ObtenerListaCMulta(page).subscribe(
        
        response=> {this.contribuciones= response.contenido as ContribucionAMulta[]
          this.paginador=response;
        }
        
      );
    }
  
    eliminarContribucion(contribucion:ContribucionAMulta){
      swal({
        title: 'Estas seguro?',
        text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.contribucionMultaService.delete(contribucion.codigo_contribucion).subscribe(response=>{
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
