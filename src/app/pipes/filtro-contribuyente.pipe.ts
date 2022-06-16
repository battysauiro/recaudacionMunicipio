import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroContribuyentePipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultado = [];
    for (const term of value)  
      if (term.rfc_contribuyente.toUpperCase().indexOf(args.toUpperCase()) > -1 || term.nombre.toUpperCase().indexOf(args.toUpperCase()) > -1 || term.apellido_p.toUpperCase().indexOf(args.toUpperCase()) > -1 || term.apellido_m.toUpperCase().indexOf(args.toUpperCase()) > -1
      || (term.nombre+" "+term.apellido_p+" "+term.apellido_m).toUpperCase().indexOf(args.toUpperCase()) > -1) {
        resultado.push(term);
      }
      return resultado;
    }
  
}
