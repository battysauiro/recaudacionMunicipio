import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroContribuciones'
})
export class FiltroContribucionesPipe implements PipeTransform {

  transform(value: any, args: any): any { 
    const resultado = [];
    for (const term of value)  
      if (term.codigo_contribucion.toUpperCase().indexOf(args.toUpperCase()) > -1 || term.concepto_contribucion.toUpperCase().indexOf(args.toUpperCase()) > -1 ||
      term.descripcion.toUpperCase().indexOf(args.toUpperCase()) > -1) {
        resultado.push(term);
      } 
      return resultado; 
    }

}
