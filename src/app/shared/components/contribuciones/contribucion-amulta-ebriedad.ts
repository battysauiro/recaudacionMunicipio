import { ContribucionAprovechamiento } from "./contribucion-aprovechamiento";

export class ContribucionAMultaEbriedad extends ContribucionAprovechamiento{
    
    id_apro_ebriedad: string;
    uma_min: number;
    uma_max: number; 
    cantidad_alcohol: number;

    /**constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number,
        id_contribucion: string,id_catalogo: number,
        id_apro_ebriedad: string,uma_min: number,uma_max: number,cantidad_alcohol: number) {
        super(codigo_contribucion, concepto_contribucion,id_tipo_pago,id_descripcion,id_contribucion,id_catalogo);
        this.id_apro_ebriedad = id_apro_ebriedad;
        this.uma_min = uma_min;
        this.uma_max = uma_max;
        this.cantidad_alcohol = cantidad_alcohol;
      }*/
}
