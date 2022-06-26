import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FacturasService } from '@shared/components/linea-captura/services/facturas.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Contribucion } from '../contribucion';

@Component({
  selector: 'app-reportes-contribuciones',
  templateUrl: './reportes-contribuciones.component.html',
  styleUrls: ['./linea-capturascss.scss','./reportes-contribuciones.component.css']
})
export class ReportesContribucionesComponent implements OnInit {
  estado:boolean=true;
  seleccionTodas:boolean=false;
  tipoContribucion:number=1;
  opcionSeleccionado='';
  concepto="";
  autoCompleteContribucion = new FormControl('');
  flitroContribuciones: Observable<Contribucion[]>;
  tipoContribuciones=[{'codigo':1,'nombre':'Impuestos'},{'codigo':2,'nombre':'Derechos Generales'},{'codigo':3,'nombre':'Derechos Licencias'},{'codigo':4,'nombre':'Multas Generales'},{'codigo':5,'nombre':'Multas Ebriedades'},{'codigo':6,'nombre':'Multas Vehiculares'},{'codigo':7,'nombre':'Otros Productos'}];
  mapaReportes=[];
  constructor(private facturasService: FacturasService) { }

  ngOnInit(): void {
    this.flitroContribuciones = this.autoCompleteContribucion.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.codigo_contribucion),
      mergeMap(value => value ? this._filterContribucion(value) : []),
    );


  }

  private _filterContribucion(value: string): Observable<Contribucion[]> {
    const filterValue = value.toLowerCase();

    return this.facturasService.filtrarContribucion(filterValue);
  }

  cambiarEstado(event:boolean){
    this.mapaReportes=[];
    this.seleccionTodas=false;
    this.estado=event;
  }

  seleccion(event){
    this.mapaReportes=[];
    this.tipoContribucion=event.target.value;
  }

  seleecionarTodas(event){
    this.mapaReportes=[];
    this.seleccionTodas= event.target.checked;
  }

  rellenarTabla(){
    if(this.seleccionTodas===true){
      this.mapaReportes=[
        {'descripcion':'Contribuciones no pagadas año en curso','url':'http://localhost:8080/api/reportes/listaContribucionesNoPagadas/exportarPDF/0'},
        {'descripcion':'Contribuciones pagadas año en curso','url':'http://localhost:8080/api/reportes/listaContribucionesPagadas/exportarPDF/1'},
        ];
    }
    if(this.estado && !this.seleccionTodas){
      let nombre="";
      if(this.tipoContribucion==1){
        nombre="Impuestos";
      }
      if(this.tipoContribucion==2){
        nombre="Derechos Generales";
      }
      if(this.tipoContribucion==3){
        nombre="Derechos Licencias";
      }
      if(this.tipoContribucion==4){
        nombre="Multas Generales";
      }
      if(this.tipoContribucion==5){
        nombre="Multas Ebriedades";
      }
      if(this.tipoContribucion==6){
        nombre="Multas Vehiculares";
      }
      if(this.tipoContribucion==7){
        nombre="Otros Productos";
      }
      let urlAux:string='http://localhost:8080/api/reportes/listaContribucionesTipoNoPagadas/exportarPDF/0/'+this.tipoContribucion;
      let urlAuxPagado:string='http://localhost:8080/api/reportes/listaContribucionesTipoNoPagadas/exportarPDF/1/'+this.tipoContribucion;
      this.mapaReportes=[

        {'descripcion':'Contribuciones '+nombre+ ' no pagadas año en curso','url':urlAux},
        {'descripcion':'Contribuciones '+nombre+' pagadas año en curso','url': urlAuxPagado}
        ];
    }
    if(!this.estado && !this.seleccionTodas){
      let urlAux:string='http://localhost:8080/api/reportes/listaContribucionesConceptoNoPagadas/exportarPDF/0/'+this.concepto;
      let urlAuxPagado:string='http://localhost:8080/api/reportes/listaContribucionesConceptoNoPagadas/exportarPDF/1/'+this.concepto;
      this.mapaReportes=[

        {'descripcion':'Contribuciones '+this.concepto+ ' no pagadas año en curso','url':urlAux},
        {'descripcion':'Contribuciones '+this.concepto+' pagadas año en curso','url': urlAuxPagado}
        ];
    }
  }

  mostrarNombreContribucion(contribucion?: Contribucion): string | undefined {
    return contribucion ? contribucion.codigo_contribucion + " " + contribucion.concepto_contribucion : undefined;
  }

  seleccionarContribucion(event: MatAutocompleteSelectedEvent): void {
    let contribucion = event.option.value as Contribucion;
    this.concepto=contribucion.concepto_contribucion;
    console.log(this.concepto);
    //this.autoCompleteContribucion.setValue('');
    //event.option.focus();
    //event.option.deselect();
  }

}
