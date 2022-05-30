import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/usuarios/auth.service';
import { Contribucion } from './contribucion';
import { Contribuciones } from './contribuciones';
import { ContribucionesServiceService } from './contribuciones-service.service';

@Component({
  selector: 'app-contribuciones',
  templateUrl: './contribuciones.component.html',
  styleUrls: ['./contribuciones.component.css']
})
export class ContribucionesComponent implements OnInit {

  paginador:any;  
  contribuciones:Contribuciones[]; 
  //76contribucionesGeneral:Contribuciones[];

  
  constructor(private contribucionService:ContribucionesServiceService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService) { }

  ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe(params=>{
    let page:number=+params.get('page');
    if(!page){
      page=0;
    }
    this.obtenerContribuciones(page);
   }
   );
  
  }
  

  private obtenerContribuciones(page:number){   
    this.contribucionService.ObtenerListaContribucionesCompleto(page).subscribe(
      
      response=> {this.contribuciones= response.contenido as Contribuciones[]
        this.paginador=response;
      }
      
    );
    
  }

}
