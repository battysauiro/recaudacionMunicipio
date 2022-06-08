import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import swal from 'sweetalert2';
import { ContribucionOtrosProductos } from '../contribucion-otros-productos';
import { COtrosProductosServiceService } from '../servicios/c-otros-productos-service.service';

@Component({
  selector: 'app-otros-productos',
  templateUrl: './otros-productos.component.html',
  styleUrls: ['./otros-productos.component.css']
})
export class OtrosProductosComponent implements OnInit {
 
  paginador:any;  
  contribuciones:ContribucionOtrosProductos[];
  pagina=0;
  termProducto='';
  constructor(private contribucionOtrosPService:COtrosProductosServiceService,
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
      this.contribucionOtrosPService.ObtenerListaCOtrosProductos(page).subscribe(
        
        response=> {this.contribuciones= response.contenido as ContribucionOtrosProductos[]
          this.paginador=response;
        }
        
      );
    }
  
    eliminarContribucion(contribucion:ContribucionOtrosProductos){
      swal({
        title: 'Estas seguro?',
        text: `¿Seguro que desea eliminar la contribucion  ${contribucion.codigo_contribucion}?!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.value) {
          this.contribucionOtrosPService.delete(contribucion.codigo_contribucion).subscribe(response=>{
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
