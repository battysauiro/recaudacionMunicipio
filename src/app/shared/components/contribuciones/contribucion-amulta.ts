import { ContribucionAprovechamiento } from "./contribucion-aprovechamiento";

export class ContribucionAMulta extends ContribucionAprovechamiento{

    id_aprovechamiento_multa: string;
    cantidad: number;

    /**constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number,
        id_contribucion: string,id_catalogo: number,
        id_aprovechamiento_multa: string,cantidad: number) {
        super(codigo_contribucion, concepto_contribucion,id_tipo_pago,id_descripcion,id_contribucion,id_catalogo);
        this.id_aprovechamiento_multa = id_aprovechamiento_multa;
        this.cantidad = cantidad;
      }*/
}
