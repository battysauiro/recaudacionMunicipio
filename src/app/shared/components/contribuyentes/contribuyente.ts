import { Factura } from "../linea-captura/models/factura";

export class Contribuyente {
    id_contribuyente:number; 
    rfc_contribuyente :string;
    calle :string;
    numero :string;
    colonia :string;
    cp :string;
    facturas:Array<Factura>[]=[];
    tipo_contribuyente:number;

    /**constructor(id_contribuyente:number,rfc_contribuyente :string,calle :string,numero :string,colonia :string,cp :string) {
        this.id_contribuyente=id_contribuyente;
        this.rfc_contribuyente=rfc_contribuyente;
        this.calle=calle;
        this.numero=numero;
        this.colonia=colonia;
        this.cp=cp;
      }*/
}
