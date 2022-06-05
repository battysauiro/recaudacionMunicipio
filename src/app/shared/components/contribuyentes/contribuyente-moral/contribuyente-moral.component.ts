import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { ContribuyenteMoral } from '../contribuyente-moral';
import { ContribuyenteService } from '../contribuyente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contribuyente-moral',
  templateUrl: './contribuyente-moral.component.html',
  styleUrls: ['./contribuyente-moral.component.css']
})
export class ContribuyenteMoralComponent implements OnInit {

  contribuyentesM:ContribuyenteMoral[];
  paginador:any;
  pagina=0; 
  termino='';
  constructor(private contribuyenteService:ContribuyenteService,
    public authService:AuthService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let page:number=+params.get('page');
      if(!page){
        page=0;
      }
      this.pagina=page;
      this.obtenerContribuyentesM(page);
      }
    ); 
  }

  private obtenerContribuyentesM(pagina:number){
    this.contribuyenteService.ObtenerListaContribuentesM(pagina).subscribe(
      response=> {this.contribuyentesM=response.contenido as ContribuyenteMoral[];
        this.paginador=response;
      }
    );
  }

  eliminarContribuyenteM(contribuyenteM:ContribuyenteMoral){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al contribuyente con razón social: ${contribuyenteM.rfc_contribuyente}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.contribuyenteService.deleteM(contribuyenteM.rfc_contribuyente).subscribe(response=>{
        this.obtenerContribuyentesM(this.pagina);
          swal(
            'Contribuyente Eliminado!',
            `Contribuyente ${contribuyenteM.razon_social}  eliminado con éxito`,
            'success'
          ) 
        });
      } 
    })
  }

}
