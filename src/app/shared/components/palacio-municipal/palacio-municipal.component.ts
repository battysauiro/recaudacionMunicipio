import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { PalacioServiceService } from './palacio-service.service';
import { Palaciomunicipal } from './palaciomunicipal';
import swal from 'sweetalert2';

@Component({
  selector: 'app-palacio-municipal',
  templateUrl: './palacio-municipal.component.html',
  styleUrls: ['./palacio-municipal.component.css']
})
export class PalacioMunicipalComponent implements OnInit {

  paginador:any; 
  palacios:Palaciomunicipal[];
  pagina=0;
  constructor(private palacioService:PalacioServiceService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService) { }  

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerPalacios(page);
     }
     );
  }

  private obtenerPalacios(page:number){   
    this.palacioService.ObtenerListaPalacios(page).subscribe(
      
      response=> {this.palacios= response.contenido as Palaciomunicipal[]
        this.paginador=response;
      }
      
    );
  }

  eliminarPalacio(palacio:Palaciomunicipal){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar el palacio Municipal  ${palacio.nombre_municipio}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.palacioService.delete(palacio.id).subscribe(response=>{
        this.obtenerPalacios(this.pagina);
          swal(
            'Palacio Municipal Eliminado!',
            `Palacio Municipal ${palacio.nombre_municipio}  eliminado con éxito`,
            'success'
          )
          
        });
        
  
      } 
    })
  }
  
}
