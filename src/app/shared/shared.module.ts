import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as fromComponents from './components';
import { ContribuyentesComponent } from './components/contribuyentes/contribuyentes.component';
import { FormComponent } from './components/contribuyentes/form.component';
import { RouterModule } from '@angular/router';
import { FormMoralComponent } from './components/contribuyentes/contribuyente-moral/form-moral/form-moral.component';
import { ContribucionesComponent } from './components/contribuciones/contribuciones.component';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { PaginadorEmpleadoComponent } from './components/empleados/paginador/paginador.component';
import { PaginadorContribuyentesComponent } from './components/contribuyentes/paginador-contribuyentes/paginador-contribuyentes.component';
import { FormContribucionesComponent } from './components/contribuciones/form-contribuciones.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { EmpleadoFormComponent } from './components/empleados/empleado-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContribuyenteMoralComponent } from './components/contribuyentes/contribuyente-moral/contribuyente-moral.component';
import { PaginadorCmoralComponent } from './components/contribuyentes/contribuyente-moral/paginador-cmoral/paginador-cmoral.component';
import { PalacioMunicipalComponent } from './components/palacio-municipal/palacio-municipal.component';
import { PaginadorPalaciomunicipalComponent } from './components/palacio-municipal/paginador-palaciomunicipal/paginador-palaciomunicipal.component';
import { FormPalacioComponent } from './components/palacio-municipal/form-palacio/form-palacio.component';
import { UsersComponent } from './components/users/users.component';
import { PaginadorUserComponent } from './components/users/paginador-user/paginador-user.component';
import { FormUserComponent } from './components/users/form-user/form-user.component';
import { RolesComponent } from './components/roles/roles.component';
import { ContribucionImpuestoComponent } from './components/contribuciones/contribucion-impuesto/contribucion-impuesto.component';
import { ContribucionDerechosComponent } from './components/contribuciones/contribucion-derechos/contribucion-derechos.component';
import { DerechosGeneralComponent } from './components/contribuciones/contribucion-derechos/derechos-general/derechos-general.component';
import { DerechosLicenciaComponent } from './components/contribuciones/contribucion-derechos/derechos-licencia/derechos-licencia.component';
import { MultaVehicularComponent } from './components/contribuciones/contribucion-aprovechamiento/multa-vehicular/multa-vehicular.component';
import { MultaComponent } from './components/contribuciones/contribucion-aprovechamiento/multa/multa.component';
import { MultaEbriedadComponent } from './components/contribuciones/contribucion-aprovechamiento/multa-ebriedad/multa-ebriedad.component';
import { OtrosProductosComponent } from './components/contribuciones/otros-productos/otros-productos.component';
import { FormImpuestoComponent } from './components/contribuciones/contribucion-impuesto/form-impuesto/form-impuesto.component';
import { PaginadorImpuestoComponent } from './components/contribuciones/contribucion-impuesto/paginador-impuesto/paginador-impuesto.component';
import { FormLicenciaComponent } from './components/contribuciones/contribucion-derechos/derechos-licencia/form-licencia/form-licencia.component';
import { PaginadorLicenciaComponent } from './components/contribuciones/contribucion-derechos/derechos-licencia/paginador-licencia/paginador-licencia.component';
import { FormVehicularComponent } from './components/contribuciones/contribucion-aprovechamiento/multa-vehicular/form-vehicular/form-vehicular.component';
import { PaginadorVehicularComponent } from './components/contribuciones/contribucion-aprovechamiento/multa-vehicular/paginador-vehicular/paginador-vehicular.component';
import { FormMultaComponent } from './components/contribuciones/contribucion-aprovechamiento/multa/form-multa/form-multa.component';
import { PaginadorMultaComponent } from './components/contribuciones/contribucion-aprovechamiento/multa/paginador-multa/paginador-multa.component';
import { FormEbriedadComponent } from './components/contribuciones/contribucion-aprovechamiento/multa-ebriedad/form-ebriedad/form-ebriedad.component';
import { PaginadorEbriedadComponent } from './components/contribuciones/contribucion-aprovechamiento/multa-ebriedad/paginador-ebriedad/paginador-ebriedad.component';
import { FormOtrosProductosComponent } from './components/contribuciones/otros-productos/form-otros-productos/form-otros-productos.component';
import { PaginadorOtrosProductosComponent } from './components/contribuciones/otros-productos/paginador-otros-productos/paginador-otros-productos.component';
import { FormDerechoGeneralComponent } from './components/contribuciones/contribucion-derechos/derechos-general/form-derecho-general/form-derecho-general.component';
import { PaginadorDerechoGeneralComponent } from './components/contribuciones/contribucion-derechos/derechos-general/paginador-derecho-general/paginador-derecho-general.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FiltroContribuyentePipe } from 'app/pipes/filtro-contribuyente.pipe';
import { FiltroContribuyentemoralPipe } from 'app/pipes/filtro-contribuyentemoral.pipe';
import { FiltroEmpleadoPipe } from 'app/pipes/filtro-empleado.pipe';
import { FiltroPalacioPipe } from 'app/pipes/filtro-palacio.pipe';
import { FiltroUsuarioPipe } from 'app/pipes/filtro-usuario.pipe';
import { FiltroContribucionesPipe } from 'app/pipes/filtro-contribuciones.pipe';
import { ChangePasswordComponent } from './components/recuperar-password/change-password.component';
import { SendEmailComponent } from './components/recuperar-password/send-email.component';
import { AlertModule } from 'app/alerts/alert/alert.module';
import { LineaCapturaComponent } from './components/linea-captura/linea-captura.component';
import { GenerarFacturaComponent } from './components/linea-captura/generar-factura/generar-factura.component';
import { CapturaFolioComponent } from './components/captura-folio/captura-folio.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportesContribucionesComponent } from './components/contribuciones/reportes-contribuciones/reportes-contribuciones.component';
import { ReportesContribuyentesComponent } from './components/contribuyentes/reportes-contribuyentes/reportes-contribuyentes.component';
import { VistaAdeudosComponent } from './components/vista-adeudos/vista-adeudos.component';


@NgModule({
  declarations: [...fromComponents.components, ContribuyentesComponent, FormComponent, FormMoralComponent, ContribucionesComponent, PaginadorComponent, PaginadorContribuyentesComponent, FormContribucionesComponent, EmpleadosComponent, EmpleadoFormComponent,PaginadorEmpleadoComponent, UsuariosComponent, InicioComponent, ContribuyenteMoralComponent, PaginadorCmoralComponent, PalacioMunicipalComponent, PaginadorPalaciomunicipalComponent, FormPalacioComponent, UsersComponent, PaginadorUserComponent, FormUserComponent, RolesComponent, ContribucionImpuestoComponent, ContribucionDerechosComponent, DerechosGeneralComponent, DerechosLicenciaComponent, MultaVehicularComponent, MultaComponent, MultaEbriedadComponent, OtrosProductosComponent,
    FormImpuestoComponent, PaginadorImpuestoComponent, FormLicenciaComponent, PaginadorLicenciaComponent,FormDerechoGeneralComponent,PaginadorDerechoGeneralComponent, FormVehicularComponent, PaginadorVehicularComponent, FormMultaComponent, PaginadorMultaComponent, FormEbriedadComponent, PaginadorEbriedadComponent, FormOtrosProductosComponent, PaginadorOtrosProductosComponent,FiltroContribuyentePipe,FiltroContribuyentemoralPipe,FiltroEmpleadoPipe,FiltroPalacioPipe,FiltroUsuarioPipe,FiltroContribucionesPipe, ChangePasswordComponent,SendEmailComponent, LineaCapturaComponent, GenerarFacturaComponent, CapturaFolioComponent, ReportesComponent, ReportesContribucionesComponent, ReportesContribuyentesComponent, VistaAdeudosComponent],
  imports: [
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ...fromComponents.components
  ]
})
export class SharedModule { }
