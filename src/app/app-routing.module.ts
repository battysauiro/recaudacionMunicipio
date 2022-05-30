import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { ContribucionImpuestoComponent } from '@shared/components/contribuciones/contribucion-impuesto/contribucion-impuesto.component';
import { FormImpuestoComponent } from '@shared/components/contribuciones/contribucion-impuesto/form-impuesto/form-impuesto.component';
import { ContribucionesComponent } from '@shared/components/contribuciones/contribuciones.component';
import { FormContribucionesComponent } from '@shared/components/contribuciones/form-contribuciones.component';
import { ContribuyenteMoral } from '@shared/components/contribuyentes/contribuyente-moral';
import { ContribuyenteMoralComponent } from '@shared/components/contribuyentes/contribuyente-moral/contribuyente-moral.component';
import { FormMoralComponent } from '@shared/components/contribuyentes/contribuyente-moral/form-moral/form-moral.component';
import { ContribuyentesComponent } from '@shared/components/contribuyentes/contribuyentes.component';
import { FormComponent } from '@shared/components/contribuyentes/form.component';
import { EmpleadoFormComponent } from '@shared/components/empleados/empleado-form.component';
import { EmpleadosComponent } from '@shared/components/empleados/empleados.component';
import { InicioComponent } from '@shared/components/inicio/inicio.component';
import { FormPalacioComponent } from '@shared/components/palacio-municipal/form-palacio/form-palacio.component';
import { PalacioMunicipalComponent } from '@shared/components/palacio-municipal/palacio-municipal.component';
import { FormUserComponent } from '@shared/components/users/form-user/form-user.component';
import { UsersComponent } from '@shared/components/users/users.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { LoginComponent } from './usuarios/login/login.component';


const routes: Routes = [
  //{path:'',redirectTo:'/inicio',pathMatch:'full'},//component:LoginComponent},//SkeletonComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},//component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'inicio',component:InicioComponent,children: [  
    //{path:'contribuyentes',component:ContribuyentesComponent,canActivate:[AuthGuard]},
    //{path:'contribuyentes/page/:page',component:ContribuyentesComponent,canActivate:[AuthGuard]},
    //{path:'contribuyentes/page/:page/contribuyenteF/form',component:FormComponent,canActivate:[AuthGuard]},
    //{path:'contribuyentes/contribuyenteF/form',component:FormComponent,canActivate:[AuthGuard]},
    //{path:'contribuyentes/contribuyenteF/form/:id',component:FormComponent,canActivate:[AuthGuard]},
    //{path:'contribuyentes/page/:page/contribuyenteF/form/:id',component:FormComponent,canActivate:[AuthGuard]},
    //{path:'contribuyentes/contribuyenteM/form',component:FormMoralComponent,canActivate:[AuthGuard]},
    //{path:'contribuyentes/page/:page/contribuyenteM/form',component:FormMoralComponent,canActivate:[AuthGuard]},
    //{path:'contribuyentes/contribuyenteM/form/:id',component:FormMoralComponent,canActivate:[AuthGuard]},
    //{path:'contribuciones',component:ContribucionesComponent,canActivate:[AuthGuard]},
    //{path:'contribuciones/formContribuciones',component:FormContribucionesComponent,canActivate:[AuthGuard]},
    //{path:'contribuciones/page/:page/formContribuciones',component:FormContribucionesComponent,canActivate:[AuthGuard]},
    //{path:'contribuciones/page/:page',component:ContribucionesComponent,canActivate:[AuthGuard]},
    //{path:'empleados',component:EmpleadosComponent,canActivate:[AuthGuard]},
    //{path:'empleados/page/:page',component:EmpleadosComponent,canActivate:[AuthGuard]},
    //{path:'empleados/formEmpleados',component:EmpleadoFormComponent,canActivate:[AuthGuard]},
    //{path:'empleados/formEmpleados/:id',component:EmpleadoFormComponent,canActivate:[AuthGuard]},
    //{path:'empleados/page/:page/formEmpleados',component:EmpleadoFormComponent,canActivate:[AuthGuard]},
    //{path:'empleados/page/:page/formEmpleados/:id',component:EmpleadoFormComponent,canActivate:[AuthGuard]}
    ],canActivate:[AuthGuard]  
    
    
  },//{path:'formContribuciones',component:FormContribucionesComponent,canActivate:[AuthGuard]},
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
  {path:'impuestos/FormImpuesto/:id',component:FormImpuestoComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
