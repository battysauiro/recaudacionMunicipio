import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FacturasService } from '@shared/components/linea-captura/services/facturas.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ContribuyenteFisica } from '../contribuyente-fisica';
import { ContribuyenteMoral } from '../contribuyente-moral';

@Component({
  selector: 'app-reportes-contribuyentes',
  templateUrl: './reportes-contribuyentes.component.html',
  styleUrls: ['./linea-capturascss.component.scss','./reportes-contribuyentes.component.css']
})
export class ReportesContribuyentesComponent implements OnInit {

  autoCompleteContribuyente = new FormControl('');
  mapaReportes=[];
  estado:boolean=true;
  filtroContribuyente: Observable<any[]>;
  contribuyenteFisica = new ContribuyenteFisica();
  contribuyenteMoral = new ContribuyenteMoral();
  rfcContribuyente="";
  nombre="";

  constructor(private facturasService: FacturasService) { }

  ngOnInit(): void {
    if (this.estado) {
      this.filtroContribuyente as Observable<ContribuyenteFisica[]>;
      this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

        map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
        mergeMap(value => value ? this._filterContribuyenteFisica(value) : []),
      );
    }
    else {
      console.log("entrooooo en el contribuyente moralllll");
      this.filtroContribuyente as Observable<ContribuyenteMoral[]>;
      this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

        map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
        mergeMap(value => value ? this._filterContribuyenteMoral(value) : []),
      );
    }

  }

  private _filterContribuyenteFisica(value: string): Observable<ContribuyenteFisica[]> {
    const filterValue = value.toLowerCase();

    return this.facturasService.filtrarContribuyenteFisica(filterValue);
  }

  private _filterContribuyenteMoral(value: string): Observable<ContribuyenteMoral[]> {
    const filterValue = value.toLowerCase();

    return this.facturasService.filtrarContribuyenteMoral(filterValue);
  }

  mostrarNombreContribuyente(contribuyente?: any): string | undefined {
    if (this.estado) {
      contribuyente = contribuyente as ContribuyenteFisica;
      return contribuyente ? contribuyente.rfc_contribuyente + " " + contribuyente.nombre : undefined;
    }
    else {
      contribuyente = contribuyente as ContribuyenteMoral;
      return contribuyente ? contribuyente.rfc_contribuyente + " " + contribuyente.razon_social : undefined;
    }
  }

  cambiarEstado(event:boolean){
    this.autoCompleteContribuyente.setValue('');
    this.mapaReportes=[];
    this.estado=event;
    if (this.estado) {
      this.filtroContribuyente as Observable<ContribuyenteFisica[]>;
      this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

        map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
        mergeMap(value => value ? this._filterContribuyenteFisica(value) : []),
      );
    }
    else {
      this.filtroContribuyente as Observable<ContribuyenteMoral[]>;
      this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

        map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
        mergeMap(value => value ? this._filterContribuyenteMoral(value) : []),
      );
    }
  }

  seleccionarContribuyente(event: MatAutocompleteSelectedEvent): void {

    if (this.estado) {
      this.contribuyenteFisica = event.option.value as ContribuyenteFisica;
      this.rfcContribuyente = this.contribuyenteFisica.rfc_contribuyente;
      this.nombre=this.contribuyenteFisica.nombre+" "+this.contribuyenteFisica.apellido_p+" "+this.contribuyenteFisica.apellido_m;
    } else {
      this.contribuyenteMoral = event.option.value as ContribuyenteMoral;
      this.rfcContribuyente = this.contribuyenteMoral.rfc_contribuyente;
      this.nombre=this.contribuyenteMoral.razon_social;
    }

  }

  rellenarTabla(){
    if(this.estado){
      let nombre="";

      let urlAux:string='http://localhost:8080/api/reportes/listaContribuyentesFisicasNoPagadas/exportarPDF/'+this.rfcContribuyente+'/0';
      let urlAuxPagado:string='http://localhost:8080/api/reportes/listaContribuyentesFisicasNoPagadas/exportarPDF/'+this.rfcContribuyente+'/1';
      this.mapaReportes=[

        {'descripcion':'Contribuciones no pagadas de la persona Fisica: '+this.nombre,'url':urlAux},
        {'descripcion':'Contribuciones  pagadas de la persona Fisica: '+this.nombre,'url': urlAuxPagado}
        ];
    }
    if(!this.estado){
      let urlAux:string='http://localhost:8080/api/reportes/listaContribucionesContribuyenteMNoPagadasM/exportarPDF/'+this.rfcContribuyente+'/0';
      let urlAuxPagado:string='http://localhost:8080/api/reportes/listaContribucionesContribuyenteMNoPagadasM/exportarPDF/'+this.rfcContribuyente+'/1';
      this.mapaReportes=[

        {'descripcion':'Contribuciones no pagadas de la persona Moral: '+this.nombre,'url':urlAux},
        {'descripcion':'Contribuciones  pagadas de la persona Moral: '+this.nombre,'url': urlAuxPagado}
        ];
    }
  }

}
