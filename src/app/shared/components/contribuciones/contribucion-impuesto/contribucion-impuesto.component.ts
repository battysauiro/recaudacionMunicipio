import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { ContribucionImpuesto } from '../contribucion-impuesto';
import { CImpuestoServiceService } from '../servicios/c-impuesto-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contribucion-impuesto',
  templateUrl: './contribucion-impuesto.component.html',
  styleUrls: ['./contribucion-impuesto.component.css']
})
export class ContribucionImpuestoComponent implements OnInit {

  paginador:any; 
  contribuciones:ContribucionImpuesto[];
  pagina=0;

  constructor(private contribucionImpuestoService:CImpuestoServiceService,
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
    this.contribucionImpuestoService.ObtenerListaCImpuesto(page).subscribe(
      
      response=> {this.contribuciones= response.contenido as ContribucionImpuesto[]
        this.paginador=response;
      }
      
    );
  }

  eliminarContribucion(contribucion:ContribucionImpuesto){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.contribucionImpuestoService.delete(contribucion.codigo_contribucion).subscribe(response=>{
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
