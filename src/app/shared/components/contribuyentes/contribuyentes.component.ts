import { Component, OnInit } from '@angular/core';
//import { Contribuyente } from './contribuyente';
import { ContribuyenteFisica } from './contribuyente-fisica';
import { ContribuyenteService } from './contribuyente.service';
import swal from 'sweetalert2';
import { ContribuyenteMoral } from './contribuyente-moral';
import { AuthService } from 'app/usuarios/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contribuyentes',
  templateUrl: './contribuyentes.component.html',
  styleUrls: ['./contribuyentes.component.css']
})
export class ContribuyentesComponent implements OnInit {
  _isChecked:boolean;//=true;
  _isChecked2:boolean;
  pagina=0;
  isFisrt=false;
  isLast=false;
  totalPaginas:number[];
  paginador:any;
  
  contribuyentes:ContribuyenteFisica[];
  contribuyentesM:ContribuyenteMoral[];
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
    this.tipo();
    console.log(this._isChecked,"este es la mitad del camino");
    console.log(this._isChecked2,"este es la mitad del camino chec2");
    //this._isChecked=this._isChecked2;
    if(this._isChecked2==null){
      console.log(this._isChecked,"este es el nuevo cambio porque esta vacio");
      this._isChecked=true;
    if(this._isChecked){
      console.log("entra en obtenerfisica 1");
      
      
      this.obtenerContribuyentes(page);
      console.log(this._isChecked2,"esto es el get");
    }
    else{
      console.log("entra en obtenerMoral 1");
      this.obtenerContribuyentesM(page);
      console.log(this._isChecked,"ya al final");
    }
    }else{
      this._isChecked=this._isChecked2;
      if(this._isChecked){
        console.log("entra en obtenerfisica 1 pero del no vaciio");
        
        
        this.obtenerContribuyentes(page);
        console.log(this._isChecked,"esto es el get pero del no vaciio");
      }
      else{
        console.log("entra en obtenerMoral 1 pero del no vaciio");
        this.obtenerContribuyentesM(page);
        console.log(this._isChecked,"ya al final pero del no vaciio");
      }
     
    }
    }
    );
   
    //this.contribuyenteService.tipoContribuyenteDisparador.subscribe(data=>{
      //  data=this._isChecked2=data;
        //console.log(this._isChecked2,"la datita")});
  }    

  private tipo(){
   
    this._isChecked2=this.contribuyenteService.getTipo();
    console.log("estamos en tipo",this._isChecked2);
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
  private obtenerContribuyentesM(pagina:number){
    this.contribuyenteService.ObtenerListaContribuentesM(pagina).subscribe(
      response=> {this.contribuyentesM=response.contenido as ContribuyenteMoral[];
        this.paginador=response;
      }
    );
  }
 
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
        this.contribuyenteService.delete(contribuyenteF.id_contribuyente_fisica).subscribe(response=>{
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
        this.contribuyenteService.deleteM(contribuyenteM.id_contribuyente_moral).subscribe(response=>{
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
    })*/
  }

  onChange(event :Event){
    this._isChecked = (event.target as HTMLInputElement).checked;//Eventelement.checked as HTMLInputElement;
  console.log(this._isChecked,"a ver")
  if(this._isChecked){
    this.obtenerContribuyentes(this.pagina);
    console.log(this._isChecked,"a ver 1")
  }
  else{
    this.obtenerContribuyentesM(this.pagina);
    console.log(this._isChecked,"a ver 2")
  }
  }

  public get isChecked():boolean{
    return this._isChecked;
  }

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
