import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuario' 
})
export class FiltroUsuarioPipe implements PipeTransform {

  transform(value: any, args: any): any { 
    const resultado = [];
    for (const term of value)  
      if (term.id_empleado.toUpperCase().indexOf(args.toUpperCase()) > -1 || term.email.toUpperCase().indexOf(args.toUpperCase()) > -1) {
        resultado.push(term);
      } 
      return resultado; 
    }

}
