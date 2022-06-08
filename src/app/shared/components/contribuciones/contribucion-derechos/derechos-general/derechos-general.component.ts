import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { ContribucionDerechosGeneral } from '../../contribucion-derechos-general';
import { CDerechosGeneralServiceService } from '../../servicios/c-derechos-general-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-derechos-general',
  templateUrl: './derechos-general.component.html',
  styleUrls: ['./derechos-general.component.css']
})
export class DerechosGeneralComponent implements OnInit {
 
  paginador:any;  
  contribuciones:ContribucionDerechosGeneral[];
  pagina=0;
  termDerecho='';
  constructor(private contribucionDGeneralService:CDerechosGeneralServiceService,
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
    this.contribucionDGeneralService.ObtenerListaCDerechoG(page).subscribe(
      
      response=> {this.contribuciones= response.contenido as ContribucionDerechosGeneral[]
        this.paginador=response;
      }
      
    );
  }

  eliminarContribucion(contribucion:ContribucionDerechosGeneral){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.contribucionDGeneralService.delete(contribucion.codigo_contribucion).subscribe(response=>{
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
