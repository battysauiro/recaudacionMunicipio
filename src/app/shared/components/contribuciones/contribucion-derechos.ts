import { Contribucion } from "./contribucion";

export class ContribucionDerechos extends Contribucion{

    id_derecho: string;
    catalogo_derechos: number;
    scatalogo_derechos:string;

    /**constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number,
        id_derecho: string,catalogo_derechos: number) {
        super(codigo_contribucion, concepto_contribucion,id_tipo_pago,id_descripcion);
        this.id_derecho = id_derecho;
        this.catalogo_derechos = catalogo_derechos;
      }*/
} 
