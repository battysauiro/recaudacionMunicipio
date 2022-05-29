export class Contribucion {

    codigo_contribucion: string;
    concepto_contribucion: string;
    id_tipo_pago: number;
    id_descripcion:number;
    

    constructor(codigo_contribucion:string, concepto_contribucion:string, id_tipo_pago:number, id_descripcion:number) {
        this.codigo_contribucion = codigo_contribucion;
        this.concepto_contribucion = concepto_contribucion;
        this.id_tipo_pago = id_tipo_pago;
        this.id_descripcion = id_descripcion;
      }
}
