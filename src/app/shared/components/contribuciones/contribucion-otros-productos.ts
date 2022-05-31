import { Contribucion } from "./contribucion";

export class ContribucionOtrosProductos extends Contribucion{

    id_otros_productos: string;
    cantidad: number;
    periodicidad: number;
    speriodicidad:string;
    catalogo_otros_productos: number;
    scatalogo_otros_productos:string;

    /**constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number,
        id_otros_productos: string,cantidad: number,periodicidad: number,catalogo_otros_productos: number) {
        super(codigo_contribucion, concepto_contribucion,id_tipo_pago,id_descripcion);
        this.id_otros_productos = id_otros_productos;
        this.cantidad = cantidad;
        this.periodicidad = periodicidad;
        this.catalogo_otros_productos = catalogo_otros_productos;
      }*/
}
