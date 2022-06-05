import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEmpleado'
})
export class FiltroEmpleadoPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultado = [];
    for (const term of value)  
      if (term.curp.indexOf(args) > -1 || term.nombre.indexOf(args.toUpperCase()) > -1
      || term.apellido_p.indexOf(args.toUpperCase()) > -1 || term.apellido_m.indexOf(args.toUpperCase()) > -1
      || (term.nombre+" "+term.apellido_p+" "+term.apellido_m).indexOf(args.toUpperCase()) > -1) {
        resultado.push(term);
      } 
      return resultado; 
    }

}
