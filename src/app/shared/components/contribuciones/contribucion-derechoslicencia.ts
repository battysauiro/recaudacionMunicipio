import { ContribucionDerechos } from "./contribucion-derechos";


export class ContribucionDerechoslicencia extends ContribucionDerechos{

    id_derecho_licencia:string;
    expedicion: number;
    refrendo: number;

    /**constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number,
        id_derecho: string,catalogo_derechos: number,
        id_derecho_licencia:string,expedicion: number,refrendo: number) {
        super(codigo_contribucion, concepto_contribucion,id_tipo_pago,id_descripcion,id_derecho,catalogo_derechos);
        this.id_derecho_licencia = id_derecho_licencia;
        this.expedicion = expedicion;
        this.refrendo = refrendo;
      }*/
}
