import { ContribucionAprovechamiento } from "./contribucion-aprovechamiento";

export class ContribucionAMultaVehicular extends ContribucionAprovechamiento{

    id_multa_vehicular: string;
    descripcion_articulo: string;
    uma_min: number;
    uma_max: number;
    tipo_vehiculo: number;
    svehiculo:string;

    /**constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number,
        id_contribucion: string,id_catalogo: number,
        id_multa_vehicular: string,descripcion_articulo: string,uma_min: number,uma_max: number,tipo_vehiculo: number) {
        super(codigo_contribucion, concepto_contribucion,id_tipo_pago,id_descripcion,id_contribucion,id_catalogo);
        this.id_multa_vehicular = id_multa_vehicular;
        this.descripcion_articulo = descripcion_articulo;
        this.uma_min = uma_min;
        this.uma_max = uma_max;
        this.tipo_vehiculo = tipo_vehiculo;
      }*/
}
