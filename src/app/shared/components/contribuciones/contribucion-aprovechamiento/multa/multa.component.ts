import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { ContribucionAMulta } from '../../contribucion-amulta';
import { CAMultaEbriedadServiceService } from '../../servicios/c-amulta-ebriedad-service.service';
import swal from 'sweetalert2';
import { CAprovechamientoMultaServiceService } from '../../servicios/c-aprovechamiento-multa-service.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-multa',
  templateUrl: './multa.component.html',
  styleUrls: ['./multa.component.css']
})
export class MultaComponent implements OnInit {
  
  paginador:any;   
  contribuciones:ContribucionAMulta[];
  pagina=0;
  autoCompletado = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  
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
       this.filteredOptions = this.autoCompletado.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    }

    private _filter(value: string): string[] { 
      const filterValue = value.toLowerCase();
  
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
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
