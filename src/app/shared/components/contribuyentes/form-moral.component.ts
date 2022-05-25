import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContribuyenteMoral } from './contribuyente-moral';
import { ContribuyenteService } from './contribuyente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-moral',
  templateUrl: './form-moral.component.html',
  styleUrls: ['./form-moral.component.css']
})
export class FormMoralComponent implements OnInit {

  @Input() tipoContri:any;
  contribuyenteMoral= new ContribuyenteMoral();
  constructor(private contribuyenteService:ContribuyenteService,private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarContribuyenteMoral();
  }

  

  cargarContribuyenteMoral(){
    this.activatedRouter.params.subscribe(params=>{
      let id=params['id'];
      if(id){
        this.contribuyenteService.ObtenerContribuenteM(id).subscribe(contribuyenteM=>this.contribuyenteMoral=contribuyenteM)
      }
    });
  }

  public createMoral(estado:boolean):void{  
    this.contribuyenteService.crearContribuyenteMoral(this.contribuyenteMoral).subscribe(
      response=> {this.contribuyenteMoral=response;
                  console.log(response);
                  this.irContribuyentes(estado);
                  //this.router.navigate(['/inicio/contribuyentes'])
                  swal('Contribuyente Moral Agregado',`contribuyente ${this.contribuyenteMoral.razon_social} creado con éxito`,'success');
                }//this.router.navigate(['/inicio/contribuyentes'])          
    );
    console.log("clicked");
    console.log(this.contribuyenteMoral);
    
  }

  public updateM(estado:boolean):void{
    this.contribuyenteService.updateM(this.contribuyenteMoral).subscribe(contribuyenteM=>{
      this.irContribuyentes(estado);
      //this.router.navigate(['/inicio/contribuyentes']);
      swal('Contribuyente Moral Actualizado',`Contribuyente Moral ${contribuyenteM.razon_social} actualizado con éxito`,'success');
    });
  }

  irContribuyentes(tipoContribuyente:boolean){
    this.contribuyenteService.setTipo(tipoContribuyente);
    console.log("estamos en el ir ",tipoContribuyente)
    
    this.router.navigate(['/inicio/contribuyentes']);
  }
}
