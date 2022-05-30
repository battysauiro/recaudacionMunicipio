import { Contribucion } from "./contribucion";

export class ContribucionAprovechamiento extends Contribucion{

    id_contribucion: string;
    id_catalogo: number;

    /**constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number,
        id_contribucion: string,id_catalogo: number) {
        super(codigo_contribucion, concepto_contribucion,id_tipo_pago,id_descripcion);
        this.id_contribucion = id_contribucion;
        this.id_catalogo = id_catalogo;
      }*/
}
