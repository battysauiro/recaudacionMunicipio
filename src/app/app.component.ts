import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from '@shared/components/linea-captura/models/factura';
import { FacturasService } from '@shared/components/linea-captura/services/facturas.service';
import swal from 'sweetalert2';
import { AuthService } from './usuarios/auth.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo="Recaudacion de Ingresos";
  folio:number;
  factura =new Factura();
  descuento:string;
  concepto:string;
  importe:number;
  estadopago:string;
  pagado:boolean=false;

  constructor(public authService:AuthService, private router:Router,
    private facturasService: FacturasService){}
  title = 'recaudacionMunicipioFrontend';
  logout():void{
    swal('Logout',`Hola ${this.authService.usuario.username} has cerrado sesión con éxito`,'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  buscarFactura(){
    this.facturasService.getFactura(this.folio).subscribe(factura=>{
      this.factura=factura;
      this.descuento=this.factura.descuento+'%';
      this.concepto=this.factura.items.pop().idContribucion;
      this.pagado=this.factura.estado_pago;
      if(this.factura.estado_pago){
        this.estadopago="pagado";
      }else{
        this.estadopago="pendiente";
      }
      console.log(this.factura);
    })
  }

  cobraryDescargarPDF(){
    this.facturasService.actualizarPago(this.factura).subscribe(factura=>{
      this.createPDF();
      swal({
        title: 'Finalizar tramite?',
        text: `¿Desea terminar el tramite o realizar otra captura de folio?!`,
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Terminar tramite!',
        cancelButtonText: 'continuar con otra captura'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/inicio']);
        }
      })
    })

  }

  limpiarVentana(){
    this.factura= new Factura();

  }

  createPDF(){
    //this.generarFactura();
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
            widths: [400, 'auto', 'auto'],
            alignment: 'center',
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [{ text: 'IDS ADMINISTRACION S.C.\n"Servicios Legales, Contables y Administrativos"\nCalle Huertos los Olivos #107, Fraccionaminento Trinidad de los Huertos\n C.P. 68020               R.F.C IAD1604299M9', style: 'tableHeader', colSpan: 1, alignment: 'center' }, {text:'Fecha\n' + this.factura.fecha, style: 'tableHeader', alignment: 'center'}, { text: 'Folio\n' + this.factura.folio, style: 'tableHeader', alignment: 'center' }],
              [{ text: 'DATOS DEL CONTRIBUYENTE', fillColor: '#cccccc', style: 'tableHeader', alignment: 'center', colSpan: 3},''],
              [{ text: 'Nombre: '+this.factura.contribuyente_id, style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, false]},{},{}], //{ text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
              [{ text: 'R.M.C.: '+this.factura.rmc, style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, false]},{},{}],
              [{ text: 'Domicilio: '+this.factura.domicilio, style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, false]},{},{}],
              [{ border:[true, true, true, true], text: 'DATOS DE LA CONTRIBUCION', fillColor: '#cccccc',style: 'tableHeader', alignment: 'center', colSpan: 3},''],
              [{ border:[true, false, true, false], text: 'Concepto: '+this.concepto, style: 'tableHeader', alignment: 'left', colSpan: 3}, '',''],
              [{ border:[true, false, true, false], text: 'Forma de pago: efectivo', style: 'tableHeader', alignment: 'left', colSpan: 3}, '',''],
              [{ border:[true, true, true, true], text: 'Total pagado:  $'+this.factura.total, fillColor: '#cccccc', style: 'tableHeader', alignment: 'rigth', colSpan: 3},'',''],
            ]
          }
        }
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.download();
    this.factura=new Factura();
    this.concepto="";
    this.estadopago="";
  }
}
