import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'app/alerts/alert.service';
import { AuthService } from 'app/usuarios/auth.service';
import { Observable } from 'rxjs';
import { startWith, map, mergeMap } from 'rxjs/operators';
import { Contribucion } from '../contribuciones/contribucion';
import { ContribucionAMulta } from '../contribuciones/contribucion-amulta';
import { ContribucionAMultaEbriedad } from '../contribuciones/contribucion-amulta-ebriedad';
import { ContribucionAMultaVehicular } from '../contribuciones/contribucion-amulta-vehicular';
import { ContribucionDerechosGeneral } from '../contribuciones/contribucion-derechos-general';
import { ContribucionDerechoslicencia } from '../contribuciones/contribucion-derechoslicencia';
import { ContribucionImpuesto } from '../contribuciones/contribucion-impuesto';
import { ContribucionOtrosProductos } from '../contribuciones/contribucion-otros-productos';
import { CAMultaEbriedadServiceService } from '../contribuciones/servicios/c-amulta-ebriedad-service.service';
import { CAprovechamientoMultaServiceService } from '../contribuciones/servicios/c-aprovechamiento-multa-service.service';
import { CAprovechamientoVehicularServiceService } from '../contribuciones/servicios/c-aprovechamiento-vehicular-service.service';
import { CDerechosGeneralServiceService } from '../contribuciones/servicios/c-derechos-general-service.service';
import { CDerechosLicenciaServiceService } from '../contribuciones/servicios/c-derechos-licencia-service.service';
import { CImpuestoServiceService } from '../contribuciones/servicios/c-impuesto-service.service';
import { COtrosProductosServiceService } from '../contribuciones/servicios/c-otros-productos-service.service';
import { Contribuyente } from '../contribuyentes/contribuyente';
import { ContribuyenteFisica } from '../contribuyentes/contribuyente-fisica';
import { ContribuyenteMoral } from '../contribuyentes/contribuyente-moral';
import { ContribuyenteServiceService } from '../contribuyentes/contribuyente-service.service';
import { ContribuyenteService } from '../contribuyentes/contribuyente.service';
import { UsuarioServiceService } from '../usuarios/usuario-service.service';
import { Factura } from './models/factura';
import { ItemFactura } from './models/item-factura';
import { FacturasService } from './services/facturas.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-linea-captura',
  templateUrl: './linea-captura.component.html',
  styleUrls: ['./linea-capturascss.component.scss', './linea-captura.component.css']
})
export class LineaCapturaComponent implements OnInit {

  titulo = 'COBRO CONTRIBUCION';
  checked = true;
  checkedLicencia=true;
  mensaje:string='';
  tipoMoneda:string='';
  auxExpedicion=0;
  auxRefrendo=0;
  uma=1;
  costo = 0;
  total=0;
  esLicencia=false;
  opcionSeleccionado=0;
  itemFacturaAux= new ItemFactura();
  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };
  factura = new Factura();
  contribuyenteFisica = new ContribuyenteFisica();
  contribuyenteMoral = new ContribuyenteMoral();
  //contribuciones
  contribucionMulta = new ContribucionAMulta();
  contribucionMEbriedad = new ContribucionAMultaEbriedad();
  contribucionMVehicular = new ContribucionAMultaVehicular();
  contribucionImpuesto = new ContribucionImpuesto();
  contribucionOtrosProductos = new ContribucionOtrosProductos();
  contribucionDGneral = new ContribucionDerechosGeneral();
  contribucionDLicencias = new ContribucionDerechoslicencia();
  contribucionAux= new Contribucion();

  rfcContribuyente = ' ';
  nombreContribuyente = ' ';
  direccionContribuyente = ' ';
  autoCompleteContribuyente = new FormControl('');
  filtroContribuyente: Observable<any[]>;

  //auto completado de contribucion
  autoCompleteContribucion = new FormControl('');
  contribuyente;

  flitroContribuciones: Observable<Contribucion[]>;
  constructor(private usuarioService: UsuarioServiceService,
    private contribuyenteService: ContribuyenteService,
    private activatedRoute: ActivatedRoute,
    private facturasService: FacturasService,
    private alertService:AlertService,
    private authService:AuthService,
    private cEbriedadService: CAMultaEbriedadServiceService,
    private cImpuestoService: CImpuestoServiceService,
    private cDerechoGService: CDerechosGeneralServiceService,
    private cDLicenciasService: CDerechosLicenciaServiceService,
    private cAMultaService: CAprovechamientoMultaServiceService,
    private cAMVehicularService: CAprovechamientoVehicularServiceService,
    private cOtrosProductosService: COtrosProductosServiceService) { }

  ngOnInit(): void {
    if (this.checked) {
      this.filtroContribuyente as Observable<ContribuyenteFisica[]>;
      this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

        map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
        mergeMap(value => value ? this._filterContribuyenteFisica(value) : []),
      );
    }
    else {
      this.filtroContribuyente as Observable<ContribuyenteMoral[]>;
      this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

        map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
        mergeMap(value => value ? this._filterContribuyenteMoral(value) : []),
      );
    }

    this.flitroContribuciones = this.autoCompleteContribucion.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.codigo_contribucion),
      mergeMap(value => value ? this._filterContribucion(value) : []),
    );
  }

  private _filterContribuyenteFisica(value: string): Observable<ContribuyenteFisica[]> {
    const filterValue = value.toLowerCase();

    return this.facturasService.filtrarContribuyenteFisica(filterValue);
  }

  private _filterContribuyenteMoral(value: string): Observable<ContribuyenteMoral[]> {
    const filterValue = value.toLowerCase();

    return this.facturasService.filtrarContribuyenteMoral(filterValue);
  }

  private _filterContribucion(value: string): Observable<Contribucion[]> {
    const filterValue = value.toLowerCase();

    return this.facturasService.filtrarContribucion(filterValue);
  }

  mostrarNombreContribucion(contribucion?: Contribucion): string | undefined {
    return contribucion ? contribucion.codigo_contribucion + " " + contribucion.concepto_contribucion : undefined;
  }

  mostrarNombreContribuyente(contribuyente?: any): string | undefined {
    console.log(this.checked + " este essssssssssssssssssssss mi check")
    if (this.checked) {
      console.log("entro aquii en el check");
      contribuyente = contribuyente as ContribuyenteFisica;
      return contribuyente ? contribuyente.rfc_contribuyente + " " + contribuyente.nombre : undefined;
    }
    else {
      console.log("entro aquii en el check falso ");
      contribuyente = contribuyente as ContribuyenteMoral;
      return contribuyente ? contribuyente.rfc_contribuyente + " " + contribuyente.razon_social : undefined;
    }

  }

  onChange(estado) {
    this.checked = estado;
    this.rfcContribuyente = "";
    this.nombreContribuyente = "";
    this.direccionContribuyente = "";
    console.log(this.checked);
    if (this.checked) {
      this.filtroContribuyente as Observable<ContribuyenteFisica[]>;
      this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

        map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
        mergeMap(value => value ? this._filterContribuyenteFisica(value) : []),
      );
    }
    else {
      this.filtroContribuyente as Observable<ContribuyenteMoral[]>;
      this.filtroContribuyente = this.autoCompleteContribuyente.valueChanges.pipe(

        map(value => typeof value === 'string' ? value : value.rfc_contribuyente),
        mergeMap(value => value ? this._filterContribuyenteMoral(value) : []),
      );
    }
  }

  onChangeLicencia(estadoLicencia){
    console.log("This is mi licences status");
    if(estadoLicencia){
      this.costo=this.auxExpedicion;
    }
    else{
      this.costo=this.auxRefrendo;
    }
    this.actualizarTotal();
    console.log(estadoLicencia);
  }

  seleccionarContribuyente(event: MatAutocompleteSelectedEvent, tipo: Boolean): void {

    if (tipo) {
      console.log("estamos aqui en seleccionar de true ");
      this.contribuyente = event.option.value as ContribuyenteFisica;
      this.contribuyenteFisica = this.contribuyente;
      this.rfcContribuyente = this.contribuyenteFisica.rfc_contribuyente;
      this.nombreContribuyente = this.contribuyenteFisica.nombre + " " + this.contribuyenteFisica.apellido_p + " " + this.contribuyenteFisica.apellido_m;
      let numero = '';
      if (this.contribuyenteFisica.numero != null) {
        numero = " #" + this.contribuyenteFisica.numero;
      }
      this.direccionContribuyente = "Calle: " + this.contribuyenteFisica.calle + " " + numero + " Colonia: " + this.contribuyenteFisica.colonia + " C.P: " + this.contribuyenteFisica.codigo_postal;
      this.autoCompleteContribuyente.setValue('');
      event.option.focus();
      event.option.deselect();
    } else {
      this.contribuyente = event.option.value as ContribuyenteMoral;
      this.contribuyenteMoral = this.contribuyente;
      this.rfcContribuyente = this.contribuyenteMoral.rfc_contribuyente;
      this.nombreContribuyente = this.contribuyenteMoral.razon_social;
      let numero = '';
      if (this.contribuyenteFisica.numero != null) {
        numero = " #" + this.contribuyenteMoral.numero;
      }
      this.direccionContribuyente = "Calle: " + this.contribuyenteMoral.calle + " " + numero + " Colonia: " + this.contribuyenteMoral.colonia + " C.P: " + this.contribuyenteMoral.codigo_postal;
      this.autoCompleteContribuyente.setValue('');
      event.option.focus();
      event.option.deselect();
    }

  }

  seleccionarContribucion(event: MatAutocompleteSelectedEvent): void {
    let contribucion = event.option.value as Contribucion;
    this.contribucionAux= contribucion;
    this.tipoMoneda="$";
    this.uma=1;
    this.mensaje="";
    if(contribucion.nivelContribucion===1){
      this.cImpuestoService.ObtenerCImpuesto(contribucion.codigo_contribucion).subscribe(contribucion=>{this.costo=contribucion.cantidad;
        this.actualizarTotal();
        this.tipoMoneda="$";
      });
    }

    if(contribucion.nivelContribucion===2){
      this.cDerechoGService.ObtenerCDerechoG(contribucion.codigo_contribucion).subscribe(contribucion=>{this.costo=contribucion.cantidad;
        if(contribucion.id_tipo_pago==1){
          this.tipoMoneda="UMA";
          this.uma=96.22;
        }
        this.actualizarTotal();
      });
    }

    if(contribucion.nivelContribucion===3){
      this.cDLicenciasService.ObtenerCDerechoLicencia(contribucion.codigo_contribucion).subscribe(contribucion=>{
        this.facturasService.existeContribucion(this.contribuyente.rfc_contribuyente,contribucion.codigo_contribucion).subscribe(existe=>{
          if(existe){
            this.costo=contribucion.refrendo;
            console.log(this.costo+"--------------------- existeeee");
            this.auxRefrendo=contribucion.refrendo;
            this.auxExpedicion=contribucion.expedicion;
            this.checkedLicencia=false;
            this.actualizarTotal();
          }
          else{
            this.costo=contribucion.expedicion;
            console.log(this.costo+"--------------------- esta en exp");
            this.auxExpedicion=contribucion.expedicion;
            this.auxRefrendo=contribucion.refrendo;
            this.checkedLicencia=true;
            this.actualizarTotal();
          }
        })

        if(contribucion.id_tipo_pago==1){
          this.tipoMoneda="UMA";
          this.uma=96.22;
        }
        this.esLicencia=true;
        console.log("esta aqui en actalizar el total "+ this.costo);
        this.actualizarTotal();
      });
    }

    if(contribucion.nivelContribucion===4){
      this.cAMultaService.ObtenerCMulta(contribucion.codigo_contribucion).subscribe(contribucion=>{this.costo=contribucion.cantidad;
        if(contribucion.id_tipo_pago==1){
          this.tipoMoneda="UMA";
          this.uma=96.22;
        }
        this.actualizarTotal();
      });
    }

    if(contribucion.nivelContribucion===5){
      this.cEbriedadService.ObtenerCMebriedad(contribucion.codigo_contribucion).subscribe(contribucion=>{this.costo=contribucion.uma_min;
        this.uma=96.22;
        this.actualizarTotal();
        //this.total=this.costo*96.22;
        this.tipoMoneda="UMA";
        this.mensaje="Sugerencias: El uma minimo a cobrar es "+contribucion.uma_min+" y el maximo es "+contribucion.uma_max;
      });
    }

    if(contribucion.nivelContribucion===6){
      this.cAMVehicularService.ObtenerCMvehicular(contribucion.codigo_contribucion).subscribe(contribucion=>{this.costo=contribucion.uma_min;
        if(contribucion.id_tipo_pago==1){
          this.tipoMoneda="UMA";
          this.mensaje="Sugerencias: El uma minimo a cobrar es "+contribucion.uma_min+" y el maximo es "+contribucion.uma_max;
          this.uma=96.22;
        }
        this.actualizarTotal();
      });
    }

    if(contribucion.nivelContribucion===7){
      this.cOtrosProductosService.ObtenerCOtrosProductos(contribucion.codigo_contribucion).subscribe(contribucion=>{this.costo=contribucion.cantidad;
        if(contribucion.id_tipo_pago==1){
          this.tipoMoneda="UMA";
          this.uma=96.22;
        }
        this.actualizarTotal();
      });
    }

    this.factura.usuario_id=this.authService.usuario.username;
    console.log(this.authService.usuario.username);
    this.factura.contribuyente_id=this.contribuyente.rfc_contribuyente;
    let nuevaContribucion = new ItemFactura();
    //nuevaContribucion.precio = this.costo;
    nuevaContribucion.cantidad = 1;
    nuevaContribucion.contribucion = contribucion;
    nuevaContribucion.idContribucion = contribucion.codigo_contribucion;
    this.factura.items=[];
    this.factura.items.push(nuevaContribucion);

    this.autoCompleteContribucion.setValue('');
    event.option.focus();
    event.option.deselect();

    /**
    if(contribucion.nivelContribucion==1){

    }
    contribucionMulta = new ContribucionAMulta();
    contribucionMEbriedad= new ContribucionAMultaEbriedad();
    contribucionMVehicular= new ContribucionAMultaVehicular();
    contribucionImpuesto = new ContribucionImpuesto();
    contribucionOtrosProductos = new ContribucionOtrosProductos();
    contribucionDGneral= new ContribucionDerechosGeneral();
    contribucionDLicencias = new ContribucionDerechoslicencia();
  }*/
  }

  eliminar(){
    this.factura.items=[];
  }

  generarFactura():void{

    this.factura.descuento=this.opcionSeleccionado;
    if(this.opcionSeleccionado>=10){
      this.total=this.costo-(this.costo*(this.opcionSeleccionado/100))
    }
    if(this.opcionSeleccionado<10){
      this.total=this.costo;
    }
    this.factura.total=this.total;
    console.log("------------------aqui va la factura---------------");
    console.log(this.factura);
    this.facturasService.createFactura(this.factura).subscribe(factura=>{
      this.factura=factura;
      this.itemFacturaAux=factura.items.pop();
      console.log(this.itemFacturaAux);
      this.createPDF();
      console.log("esta es la nueva facturaaaaaaaaaaaaaaaaaaaaaa");
      console.log(this.factura);
      this.alertService.success('Se ha creado la linea de pago', this.options);
    });
  }

  actualizarTotal(){
    if(this.uma===96.22){
      this.total=this.costo*this.uma;
    }
    else{
      this.total=this.costo;
    }
  }

  createPDF(){
    //this.generarFactura();
    const pdfDefinition: any = {
      content: [
        {
          text: 'CAPTURA DE PAGO',
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
              [{ text: 'IDS ADMINISTRACION S.C.\n"Servicios Legales, Contables y Administrativos"\nCalle Huertos los Olivos #107, Fraccionaminento Trinidad de los Huertos\n C.P. 68020            R.F.C. IAD1604299M9', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, { text: 'Folio:\n' + String(this.factura.folio), style: 'tableHeader', alignment: 'center' }],
              [{ text: 'Fecha: ' + this.factura.fecha, style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, false]},{},{}], //{ text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
              [{ text: 'Cajero: ' + this.factura.usuario_id, style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, false]},{},{}],
              [{ text: 'Contribuyente: ' + this.factura.contribuyente_id, style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, false]},{},{}],
              [{ text: 'R.M.C: ' + this.factura.contribuyente_id, style: 'tableHeader', alignment: 'left', colSpan: 3, border:[true, false, true, true]},{},{}],
              [{ border:[true, true, true, false], text: 'INFORMACION DE PAGO', style: 'tableHeader', alignment: 'center', colSpan: 3},''],
              [{ colSpan: 3, border:[true, false, true, false], text: 'Concepto: ' + this.contribucionAux.concepto_contribucion, style: 'tableHeader', alignment: 'left'}, '',''],
              [{ colSpan: 3, border:[true, false, true, true], text: 'Total: $ ' + String(this.factura.total), style: 'tableHeader', alignment: 'rigth'}, '',''],
            ]
          }
        }
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }
}



