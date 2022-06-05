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
  titulo:string ="Agregar Persona Moral";
  constructor(private contribuyenteService:ContribuyenteService,private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarContribuyenteMoral();
  }

  cargarContribuyenteMoral(){
    this.activatedRouter.params.subscribe(params=>{
      let id=params['id'];
      if(id){
        this.idFound=true;
        this.titulo="Actualizar Persona Moral";
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

  public vacio(){
    if(this.contribuyenteMoral.rfc_contribuyente==null || this.contribuyenteMoral.rfc_contribuyente=="" ||
      this.contribuyenteMoral.razon_social==null || this.contribuyenteMoral.razon_social=="" ||
      this.contribuyenteMoral.calle==null || this.contribuyenteMoral.calle=="" ||
      this.contribuyenteMoral.colonia==null || this.contribuyenteMoral.colonia=="" ||
      this.contribuyenteMoral.codigo_postal==null || this.contribuyenteMoral.codigo_postal==""){
        return true;
      }
        else{
          return false;
        }
  }
  //CONVIERTE A MAYUSCULAS LA CADENA
  onKey(event: any){
    event.target.value = event.target.value.toUpperCase();
    console.log(event.target.value); 
 }

}
