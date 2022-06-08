import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { ContribucionAMultaEbriedad } from '../../contribucion-amulta-ebriedad';
import { CAMultaEbriedadServiceService } from '../../servicios/c-amulta-ebriedad-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-multa-ebriedad',
  templateUrl: './multa-ebriedad.component.html',
  styleUrls: ['./multa-ebriedad.component.css']
})
export class MultaEbriedadComponent implements OnInit {
 
  paginador:any;  
  contribuciones:ContribucionAMultaEbriedad[];
  pagina=0;
  termEbriedad='';
  constructor(private contribucionMEbriedadService:CAMultaEbriedadServiceService,
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
      this.contribucionMEbriedadService.ObtenerListaCMebriedad(page).subscribe(
        
        response=> {this.contribuciones= response.contenido as ContribucionAMultaEbriedad[]
          this.paginador=response;
        }
        
      );
    }
  
    eliminarContribucion(contribucion:ContribucionAMultaEbriedad){
      swal({
        title: 'Estas seguro?',
        text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.contribucionMEbriedadService.delete(contribucion.codigo_contribucion).subscribe(response=>{
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
