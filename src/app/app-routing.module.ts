import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { FormEbriedadComponent } from '@shared/components/contribuciones/contribucion-aprovechamiento/multa-ebriedad/form-ebriedad/form-ebriedad.component';
import { MultaEbriedadComponent } from '@shared/components/contribuciones/contribucion-aprovechamiento/multa-ebriedad/multa-ebriedad.component';
import { FormVehicularComponent } from '@shared/components/contribuciones/contribucion-aprovechamiento/multa-vehicular/form-vehicular/form-vehicular.component';
import { MultaVehicularComponent } from '@shared/components/contribuciones/contribucion-aprovechamiento/multa-vehicular/multa-vehicular.component';
import { FormMultaComponent } from '@shared/components/contribuciones/contribucion-aprovechamiento/multa/form-multa/form-multa.component';
import { MultaComponent } from '@shared/components/contribuciones/contribucion-aprovechamiento/multa/multa.component';
import { DerechosGeneralComponent } from '@shared/components/contribuciones/contribucion-derechos/derechos-general/derechos-general.component';
import { FormDerechoGeneralComponent } from '@shared/components/contribuciones/contribucion-derechos/derechos-general/form-derecho-general/form-derecho-general.component';
import { DerechosLicenciaComponent } from '@shared/components/contribuciones/contribucion-derechos/derechos-licencia/derechos-licencia.component';
import { FormLicenciaComponent } from '@shared/components/contribuciones/contribucion-derechos/derechos-licencia/form-licencia/form-licencia.component';
import { ContribucionImpuestoComponent } from '@shared/components/contribuciones/contribucion-impuesto/contribucion-impuesto.component';
import { FormImpuestoComponent } from '@shared/components/contribuciones/contribucion-impuesto/form-impuesto/form-impuesto.component';
import { ContribucionesComponent } from '@shared/components/contribuciones/contribuciones.component';
import { FormContribucionesComponent } from '@shared/components/contribuciones/form-contribuciones.component';
import { FormOtrosProductosComponent } from '@shared/components/contribuciones/otros-productos/form-otros-productos/form-otros-productos.component';
import { OtrosProductosComponent } from '@shared/components/contribuciones/otros-productos/otros-productos.component';
import { ContribuyenteMoral } from '@shared/components/contribuyentes/contribuyente-moral';
import { ContribuyenteMoralComponent } from '@shared/components/contribuyentes/contribuyente-moral/contribuyente-moral.component';
import { FormMoralComponent } from '@shared/components/contribuyentes/contribuyente-moral/form-moral/form-moral.component';
import { ContribuyentesComponent } from '@shared/components/contribuyentes/contribuyentes.component';
import { FormComponent } from '@shared/components/contribuyentes/form.component';
import { EmpleadoFormComponent } from '@shared/components/empleados/empleado-form.component';
import { EmpleadosComponent } from '@shared/components/empleados/empleados.component';
import { InicioComponent } from '@shared/components/inicio/inicio.component';
import { GenerarFacturaComponent } from '@shared/components/linea-captura/generar-factura/generar-factura.component';
import { LineaCapturaComponent } from '@shared/components/linea-captura/linea-captura.component';
import { FormPalacioComponent } from '@shared/components/palacio-municipal/form-palacio/form-palacio.component';
import { PalacioMunicipalComponent } from '@shared/components/palacio-municipal/palacio-municipal.component';
import { ChangePasswordComponent } from '@shared/components/recuperar-password/change-password.component';
import { SendEmailComponent } from '@shared/components/recuperar-password/send-email.component';
import { FormUserComponent } from '@shared/components/users/form-user/form-user.component';
import { UsersComponent } from '@shared/components/users/users.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { LoginComponent } from './usuarios/login/login.component';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},//component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'inicio',component:InicioComponent,canActivate:[AuthGuard]}, //InicioComponent,canActivate:[AuthGuard]}, //ContribuyentesComponent,canActivate:[AuthGuard] },//{path:'formContribuciones',component:FormContribucionesComponent,canActivate:[AuthGuard]},
  {path:'contribuyentes',component:ContribuyentesComponent,canActivate:[AuthGuard]},
  {path:'contribuyentes/page/:page',component:ContribuyentesComponent,canActivate:[AuthGuard]},
  {path:'contribuyentes/contribuyenteF/form',component:FormComponent,canActivate:[AuthGuard]},
  {path:'contribuyentes/contribuyenteF/form/:id',component:FormComponent,canActivate:[AuthGuard]},
  {path:'contribuyentesMoral',component:ContribuyenteMoralComponent,canActivate:[AuthGuard]},
  {path:'contribuyentesMoral/page/:page',component:ContribuyenteMoralComponent,canActivate:[AuthGuard]},
  {path:'contribuyentes/contribuyenteM/form',component:FormMoralComponent,canActivate:[AuthGuard]},
  {path:'contribuyentes/contribuyenteM/form/:id',component:FormMoralComponent,canActivate:[AuthGuard]},
  {path:'empleados',component:EmpleadosComponent,canActivate:[AuthGuard]},
  {path:'empleados/page/:page',component:EmpleadosComponent,canActivate:[AuthGuard]},
  {path:'empleados/formEmpleados',component:EmpleadoFormComponent,canActivate:[AuthGuard]},
  {path:'empleados/formEmpleados/:id',component:EmpleadoFormComponent,canActivate:[AuthGuard]},
  {path:'palacioMunicipal',component:PalacioMunicipalComponent,canActivate:[AuthGuard]},
  {path:'palacioMunicipal/page/:page',component:PalacioMunicipalComponent,canActivate:[AuthGuard]},
  {path:'palacioMunicipal/formPalacio',component:FormPalacioComponent,canActivate:[AuthGuard]},
  {path:'palacioMunicipal/formPalacio/:id',component:FormPalacioComponent,canActivate:[AuthGuard]},
  {path:'usuario',component:UsersComponent,canActivate:[AuthGuard]},
  {path:'usuario/page/:page',component:UsersComponent,canActivate:[AuthGuard]},
  {path:'usuario/formUsuario',component:FormUserComponent,canActivate:[AuthGuard]},
  {path:'usuario/formUsuario/:id',component:FormUserComponent,canActivate:[AuthGuard]},
  {path:'impuestos',component:ContribucionImpuestoComponent,canActivate:[AuthGuard]},
  {path:'impuestos/page/:page',component:ContribucionImpuestoComponent,canActivate:[AuthGuard]},
  {path:'impuestos/FormImpuesto',component:FormImpuestoComponent,canActivate:[AuthGuard]},
  {path:'impuestos/FormImpuesto/:id',component:FormImpuestoComponent,canActivate:[AuthGuard]},
  {path:'derechosGeneral',component:DerechosGeneralComponent,canActivate:[AuthGuard]},
  {path:'derechosGeneral/page/:page',component:DerechosGeneralComponent,canActivate:[AuthGuard]},
  {path:'derechosGeneral/FormDerechoG',component:FormDerechoGeneralComponent,canActivate:[AuthGuard]},
  {path:'derechosGeneral/FormDerechoG/:id',component:FormDerechoGeneralComponent,canActivate:[AuthGuard]},
  {path:'derechosLicencia',component:DerechosLicenciaComponent,canActivate:[AuthGuard]},
  {path:'derechosLicencia/page/:page',component:DerechosLicenciaComponent,canActivate:[AuthGuard]},
  {path:'derechosLicencia/FormDerechoL',component:FormLicenciaComponent,canActivate:[AuthGuard]},
  {path:'derechosLicencia/FormDerechoL/:id',component:FormLicenciaComponent,canActivate:[AuthGuard]},
  {path:'multa',component:MultaComponent,canActivate:[AuthGuard]},
  {path:'multa/page/:page',component:DerechosLicenciaComponent,canActivate:[AuthGuard]},
  {path:'multa/FormMulta',component:FormMultaComponent,canActivate:[AuthGuard]},
  {path:'multa/FormMulta/:id',component:FormMultaComponent,canActivate:[AuthGuard]},
  {path:'multaVehicular',component:MultaVehicularComponent,canActivate:[AuthGuard]},
  {path:'multaVehicular/page/:page',component:MultaVehicularComponent,canActivate:[AuthGuard]},
  {path:'multaVehicular/FormMVehicular',component:FormVehicularComponent,canActivate:[AuthGuard]},
  {path:'multaVehicular/FormMVehicular/:id',component:FormVehicularComponent,canActivate:[AuthGuard]},
  {path:'multaEbriedad',component:MultaEbriedadComponent,canActivate:[AuthGuard]},
  {path:'multaEbriedad/page/:page',component:MultaEbriedadComponent,canActivate:[AuthGuard]},
  {path:'multaEbriedad/FormMEbriedad',component:FormEbriedadComponent,canActivate:[AuthGuard]},
  {path:'multaEbriedad/FormMEbriedad/:id',component:FormEbriedadComponent,canActivate:[AuthGuard]},
  {path:'otrosProductos',component:OtrosProductosComponent,canActivate:[AuthGuard]},
  {path:'otrosProductos/page/:page',component:OtrosProductosComponent,canActivate:[AuthGuard]},
  {path:'otrosProductos/FormOtrosProductos',component:FormOtrosProductosComponent,canActivate:[AuthGuard]},
  {path:'otrosProductos/FormOtrosProductos/:id',component:FormOtrosProductosComponent,canActivate:[AuthGuard]},
  {path:'sendEmail',component:SendEmailComponent},
  {path:'changePassword/:tokenPassword',component:ChangePasswordComponent},
  {path:'pagoContribucion',component:LineaCapturaComponent},
  {path:'generarLinea-captura',component:GenerarFacturaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
