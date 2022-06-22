import { ItemFactura } from "./item-factura";

export class Factura {
    folio : number;
    usuario_id : string;
    contribuyente_id : string;
    fecha : string;
    descuento : number;
    total : number;
    items : Array<ItemFactura>=[];
}
