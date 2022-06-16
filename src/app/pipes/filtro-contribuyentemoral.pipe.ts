import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroContribuyentemoral'
})
export class FiltroContribuyentemoralPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultado = [];
    for (const term of value)  
      if (term.rfc_contribuyente.toUpperCase().indexOf(args.toUpperCase()) > -1 || term.razon_social.toUpperCase().indexOf(args.toUpperCase()) > -1) {
        resultado.push(term);
      }
      return resultado;
    }

}
