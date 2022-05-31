import { ContribucionDerechos } from "./contribucion-derechos";

export class ContribucionDerechosGeneral extends ContribucionDerechos{

    id_derecho_general: string;
    cantidad: number;
    id_periodicidad: number;
    periodicidad: string;

    /**constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number,
        id_derecho: string,catalogo_derechos: number,
        id_derecho_general:string,cantidad: number,id_periodicidad: number) {
        super(codigo_contribucion, concepto_contribucion,id_tipo_pago,id_descripcion,id_derecho,catalogo_derechos);
        this.id_derecho_general = id_derecho_general;
        this.cantidad = cantidad;
        this.id_periodicidad = id_periodicidad;
      }*/
}
