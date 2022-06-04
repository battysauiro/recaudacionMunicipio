import { Component, OnInit } from '@angular/core';
//import { Contribuyente } from './contribuyente';
import { ContribuyenteFisica } from './contribuyente-fisica';
import { ContribuyenteService } from './contribuyente.service';
import swal from 'sweetalert2';
import { ContribuyenteMoral } from './contribuyente-moral';
import { AuthService } from 'app/usuarios/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {  map, mergeMap, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-contribuyentes',
  templateUrl: './contribuyentes.component.html',
  styleUrls: ['./contribuyentes.component.css']
})
export class ContribuyentesComponent implements OnInit {

  pagina=0;
  isFisrt=false;
  isLast=false;
  totalPaginas:number[];
  paginador:any;
  autoCompletado = new FormControl();
  filteredOptions: Observable<ContribuyenteFisica[]>;
  
  
  contribuyentes:ContribuyenteFisica[];
  term='';
  contribuyentesO:Observable<ContribuyenteFisica[]>;
  //contribuyentesM:ContribuyenteMoral[];
  constructor(private contribuyenteService:ContribuyenteService,
    public authService:AuthService,
    private activatedRoute:ActivatedRoute) { 
    //this._isChecked=true;
  }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(params=>{
    //console.log("Aqui emmpieza");
    //this._isChecked=true;
    let page:number=+params.get('page');
    if(!page){
      page=0;
    }
    this.pagina=page;
    this.obtenerContribuyentes(page);
    }
    );
    this.filteredOptions = this.autoCompletado.valueChanges.pipe(
      map(value => typeof value === 'string'? value: value.rfc_contribuyente),
      mergeMap(value => value ? this._filter(value):[]),
    );
    //this.contribuyenteService.tipoContribuyenteDisparador.subscribe(data=>{
      //  data=this._isChecked2=data;
        //console.log(this._isChecked2,"la datita")});
  }    

  private _filter(value: string): Observable<ContribuyenteFisica[]> { 
    const filterValue = value.toLowerCase();

    return this.contribuyenteService.filtarContribuyente(filterValue);
  }

  private obtenerContribuyentes(pagina:number){
    this.contribuyenteService.ObtenerListaContribuentes(pagina).subscribe(
      response=> {this.contribuyentes=response.contenido as ContribuyenteFisica[]
        this.isFisrt=response.primera;
        this.isLast=response.ultima;
        this.paginador=response;
        //this.totalPaginas=new Array(response['totalPaginas']);
      }
      
      
    );
  }
  //obtenemos la lista de contribuyentes morales
  /**private obtenerContribuyentesM(pagina:number){
    this.contribuyenteService.ObtenerListaContribuentesM(pagina).subscribe(
      response=> {this.contribuyentesM=response.contenido as ContribuyenteMoral[];
        this.paginador=response;
      }
    );
  }*/
 
   eliminarContribuyente(contribuyenteF:ContribuyenteFisica){
    swal({
      title: 'Estas seguro?',
      text: `¿Seguro que desea eliminar al contribuyente  ${contribuyenteF.nombre} ${contribuyenteF.apellido_p} ${contribuyenteF.apellido_m}?!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.contribuyenteService.delete(contribuyenteF.rfc_contribuyente).subscribe(response=>{
        this.obtenerContribuyentes(this.pagina);
          swal(
            'Contribuyente Eliminado!',
            `Contribuyente ${contribuyenteF.nombre} ${contribuyenteF.apellido_p} ${contribuyenteF.apellido_m} eliminado con éxito`,
            'success'
          )
          
        });
        
  
      } 
    })


   /*
    this.contribuyenteService.delete(id).subscribe(response=>{
      console.log(response);
    this.obtenerContribuyentes();
    })*/
  }
  mostrarNombre(contribuyente?:ContribuyenteFisica):string | undefined{
    return contribuyente? contribuyente.nombre:undefined;
  }
  /**eliminarContribuyenteM(contribuyenteM:ContribuyenteMoral){
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


   /*
    this.contribuyenteService.delete(id).subscribe(response=>{
      console.log(response);
    this.obtenerContribuyentes();
    })
  }*/




  /** rewind():void{
    if(!this.isFisrt){
      this.page--;
      if(this._isChecked){
        this.obtenerContribuyentes(this.pagina);
      }
      else{
        this.obtenerContribuyentesM(this.pagina);
      }
    }
  }*/

  /** forward():void{
    if(!this.isLast){
      this.page++;
      if(this._isChecked){
        this.obtenerContribuyentes();
      }
      else{
        this.obtenerContribuyentesM();
      }
    }
  }
   */
  /** setPage(page:number):void{
    this.page=page;
    if(this._isChecked){
      this.obtenerContribuyentes();
    }
    else{
      this.obtenerContribuyentesM();
    }
  }*/
 
}
