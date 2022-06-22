import { Contribucion } from "@shared/components/contribuciones/contribucion";

export class ItemFactura {
    contribucionFactura : number;
    idContribucion: string;
    idFactura : number;
    cantidad :number;
    importe : number = 1;
    precio : number;
    contribucion:Contribucion;

    public calcularImporte():number{
        return this.cantidad*this.precio;
    }
}
