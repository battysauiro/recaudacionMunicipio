import { Contribucion } from "./contribucion";

export class ContribucionImpuesto extends Contribucion{

    id_impuesto: string;
    catalogo_impuesto: number;
    scatalogo_impuesto:string;
    cantidad:number;

    /**constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number,
        id_impuesto: string,catalogo_impuesto: number,cantidad:number) {
        super(codigo_contribucion, concepto_contribucion,id_tipo_pago,id_descripcion);
        this.id_impuesto = id_impuesto;
        this.catalogo_impuesto = catalogo_impuesto;
        this.cantidad = cantidad;
      }*/
}
