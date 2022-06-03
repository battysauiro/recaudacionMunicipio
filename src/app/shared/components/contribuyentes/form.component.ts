import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContribuyenteFisica } from './contribuyente-fisica';
import { ContribuyenteService } from './contribuyente.service';
import swal from 'sweetalert2';
import { ContribuyenteMoral } from './contribuyente-moral';
import { ContribuyentesComponent } from './contribuyentes.component';
import { ContribuyenteServiceService } from './contribuyente-service.service';
import { AlertService } from 'app/alerts/alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
 // @Output() public estado = new EventEmitter<boolean>();
  //@Input() tipoContri:any;
 
   
  contribuyenteFisica= new ContribuyenteFisica();
  contribuyenteMoral= new ContribuyenteMoral();
  titulo:string ="Crear Persona Fisica";
  tipoContribuyente="Fisica";
  isChecked:boolean=true;
  idFound=false;

  constructor(private contribuyenteService:ContribuyenteService,private router:Router,private activatedRouter:ActivatedRoute,
    private alertService:AlertService) {
      
     }

  ngOnInit(): void {
    //this.tipoContri=this.contribuyentes.isChecked;
    //console.log("la data riciba es esta ",this.tipoContri);

    this.cargarContribuyenteFisica();

  }

  cargarContribuyenteFisica(){
    this.activatedRouter.params.subscribe(params=>{
      console.log(params)
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.titulo="Actualizar Persona Fisica";
        this.contribuyenteService.ObtenerContribuente(id).subscribe(contribuyenteF=>this.contribuyenteFisica=contribuyenteF)
      }
    });
  }

  /**cargarContribuyenteMoral(){
    this.activatedRouter.params.subscribe(params=>{
      let id=params['id'];
      if(id){
        this.contribuyenteService.ObtenerContribuenteM(id).subscribe(contribuyenteM=>this.contribuyenteMoral=contribuyenteM)
      }
    });
  }*/

  public create(estado:boolean):void{  
    this.contribuyenteService.crearContribuyenteFisica(this.contribuyenteFisica).subscribe(
      response=> {this.contribuyenteFisica=response;
                  console.log(response);
                  this.irContribuyentes(estado);
                  //this.router.navigate(['/inicio/contribuyentes'])
                  swal('Persona Fisica Agregado',`contribuyente ${this.contribuyenteFisica.curp} creado con éxito`,'success');
                }//this.router.navigate(['/inicio/contribuyentes'])          
    );
    console.log("clicked");
    console.log(this.contribuyenteFisica);
    //this.irContribuyentes(estado);
  }

  /** public createMoral():void{  
    this.contribuyenteService.crearContribuyenteMoral(this.contribuyenteMoral).subscribe(
      response=> {this.contribuyenteMoral=response;
                  console.log(response);
                  this.router.navigate(['/inicio/contribuyentes'])
                  swal('Contribuyente Moral Agregado',`contribuyente ${this.contribuyenteMoral.razon_social} creado con éxito`,'success');
                }//this.router.navigate(['/inicio/contribuyentes'])          
    );
    console.log("clicked");
    console.log(this.contribuyenteMoral);
  } */

  public update(estado:boolean):void{
    this.contribuyenteService.update(this.contribuyenteFisica).subscribe(contribuyenteF=>{
      this.irContribuyentes(estado);
      //this.router.navigate(['/inicio/contribuyentes']);
      
      swal('Contribuyente Fisica Actualizado',`Contribuyente Fisica ${contribuyenteF.curp} actualizado con éxito`,'success');
    });
  }

  /** 
  public updateM():void{
    this.contribuyenteService.updateM(this.contribuyenteMoral).subscribe(contribuyenteM=>{
      this.router.navigate(['/inicio/contribuyentes']);
      swal('Contribuyente Moral Actualizado',`Contribuyente Moral ${contribuyenteM.razon_social} actualizado con éxito`,'success');
    });
  } */

  public boxSeleccionado(event :Event):boolean{
    var element = <HTMLInputElement> document.getElementById("tipoContribuyente");
    var  isChecked = (event.target as HTMLInputElement).checked;//Eventelement.checked as HTMLInputElement;
    console.log("estossssssssss")
    console.log("isChecked")
    if(true)
      return true;
    else  
      return false
  }

  onChange(event :Event){
      this.isChecked = (event.target as HTMLInputElement).checked;//Eventelement.checked as HTMLInputElement;
    console.log(this.isChecked)
  }

  irContribuyentes(estado:boolean){
    this.contribuyenteService.setTipo(estado);
    console.log("estamos en el ir ",estado)
   //this.contribuyenteService.setTipo(tipo);
    this.router.navigate(['/contribuyentes']);
  }
}
