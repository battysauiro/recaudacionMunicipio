import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPalacio'
})
export class FiltroPalacioPipe implements PipeTransform {

  transform(value: any, args: any): any { 
    const resultado = [];
    for (const term of value)  
      if (term.nombre_municipio.toUpperCase().indexOf(args.toUpperCase()) > -1 || term.telefono.toUpperCase().indexOf(args.toUpperCase()) > -1) {
        resultado.push(term);
      } 
      return resultado; 
    }

}
