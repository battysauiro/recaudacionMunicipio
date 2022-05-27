import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContribuyenteMoral } from '../../contribuyente-moral';
import { ContribuyenteService } from '../../contribuyente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-moral',
  templateUrl: './form-moral.component.html',
  styleUrls: ['./form-moral.component.css']
})
export class FormMoralComponent implements OnInit {
  contribuyenteMoral= new ContribuyenteMoral();
  idFound=false;
  constructor(private contribuyenteService:ContribuyenteService,private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarContribuyenteMoral();
  }

  cargarContribuyenteMoral(){
    this.activatedRouter.params.subscribe(params=>{
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.contribuyenteService.ObtenerContribuenteM(id).subscribe(contribuyenteM=>this.contribuyenteMoral=contribuyenteM)
      }
    });
  }

  public createMoral():void{  
    this.contribuyenteService.crearContribuyenteMoral(this.contribuyenteMoral).subscribe(
      response=> {this.contribuyenteMoral=response;
                  console.log(response);
                  this.irContribuyentes();
                  //this.router.navigate(['/inicio/contribuyentes'])
                  swal('Contribuyente Moral Agregado',`contribuyente ${this.contribuyenteMoral.razon_social} creado con éxito`,'success');
                }//this.router.navigate(['/inicio/contribuyentes'])          
    );
    console.log("clicked");
    console.log(this.contribuyenteMoral);
    
  }

  public updateM():void{
    this.contribuyenteService.updateM(this.contribuyenteMoral).subscribe(contribuyenteM=>{
      this.irContribuyentes();
      //this.router.navigate(['/inicio/contribuyentes']);
      swal('Contribuyente Moral Actualizado',`Contribuyente Moral ${contribuyenteM.razon_social} actualizado con éxito`,'success');
    });
  }

  irContribuyentes(){
    this.router.navigate(['contribuyentesMoral']);
  }

}
