import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroContribuyentemoral'
})
export class FiltroContribuyentemoralPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultado = [];
    for (const term of value)  
      if (term.rfc_contribuyente.indexOf(args) > -1 || term.razon_social.indexOf(args) > -1) {
        resultado.push(term);
      }
      return resultado;
    }

}
