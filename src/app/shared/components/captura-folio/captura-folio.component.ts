
//import { ItemFactura } from './models/item-factura';
//import { FacturasService } from './services/facturas.service';
//comenatrio para ver si ya estoy subiendo los cambios a mi rama
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Factura } from '../linea-captura/models/factura';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-captura-folio',
  templateUrl: './captura-folio.component.html',
  styleUrls: ['./linea-capturascss.component.scss','./captura-folio.component.css']
})
export class CapturaFolioComponent implements OnInit {

  constructor(private router:Router) { 
    this.downloadPDF();
    console.log("entra o no entra");
  }

  public downloadPDF(): void {
    const doc = new jsPDF();

    doc.text('Hello world BATTI mi trabajo aquí esta hecho BAI', 10, 10);
    //doc.save('hello-world.pdf');
  }

  factura = new Factura();

  ngOnInit(): void {
  }

  irCobroContribucion(): void{
    this.router.navigate(['/captura']);
  }

  createPDF(){
    //this.generarFactura();

/**
    const pdfDefinition: any = {
      content: [
        {
          text: 'REGISTRO DE FOLIO',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },

        //segundo
        {
          style: 'tableExample',
          color: '#444',
          table: {
            widths: [445, 'auto', 'auto'],
            alignment: 'center',
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [{ text: 'IDS ADMINISTRACION S.C.\n"Servicios Legales, Contables y Administrativos"\nCalle Huertos los Olivos #107, Fraccionaminento Trinidad de los Huertos\n C.P. 68020               R.F.C IAD1604299M9', style: 'tableHeader', colSpan: 1, alignment: 'center' }, {text:'Fecha\n' + this.factura.fecha, style: 'tableHeader', alignment: 'center'}, { text: 'Folio\n' + this.factura.folio, style: 'tableHeader', alignment: 'center' }],
              [{ text: 'DATOS DEL CONTRIBUYENTE', fillColor: '#cccccc', style: 'tableHeader', alignment: 'center', colSpan: 3},''],
              [{ text: 'Nombre: ', style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, false]},{},{}], //{ text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
              [{ text: 'R.M.C.: ', style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, false]},{},{}],
              [{ text: 'Domicilio: ', style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, false]},{},{}],
              [{ border:[true, true, true, true], text: 'DATOS DE LA CONTRIBUCION', fillColor: '#cccccc',style: 'tableHeader', alignment: 'center', colSpan: 3},''],
              [{ border:[true, false, true, false], text: 'Concepto: ', style: 'tableHeader', alignment: 'left', colSpan: 3}, '',''],
              [{ border:[true, false, true, false], text: 'Detalle: ', style: 'tableHeader', alignment: 'left', colSpan: 3}, '',''],
              [{ border:[true, false, true, false], text: 'Importe: ', style: 'tableHeader', alignment: 'left', colSpan: 3}, '',''],
              [{ border:[true, false, true, false], text: 'Descuento: ', style: 'tableHeader', alignment: 'left', colSpan: 3}, '',''],
              [{ border:[true, false, true, false], text: 'Forma de pago: ', style: 'tableHeader', alignment: 'left', colSpan: 3}, '',''],
              [{ border:[true, true, true, true], text: 'Total pagado:  $', fillColor: '#cccccc', style: 'tableHeader', alignment: 'rigth', colSpan: 3},'',''],
            ]
          }
        }
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();*/

  }
}
