import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { ContribucionesComponent } from '@shared/components/contribuciones/contribuciones.component';
import { FormContribucionesComponent } from '@shared/components/contribuciones/form-contribuciones.component';
import { ContribuyentesComponent } from '@shared/components/contribuyentes/contribuyentes.component';
import { FormMoralComponent } from '@shared/components/contribuyentes/form-moral.component';
import { FormComponent } from '@shared/components/contribuyentes/form.component';
import { EmpleadoFormComponent } from '@shared/components/empleados/empleado-form.component';
import { EmpleadosComponent } from '@shared/components/empleados/empleados.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { LoginComponent } from './usuarios/login/login.component';


const routes: Routes = [
  //{path:'',redirectTo:'/inicio',pathMatch:'full'},//component:LoginComponent},//SkeletonComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},//component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'inicio',component:SkeletonComponent,children: [  
    {path:'contribuyentes',component:ContribuyentesComponent,canActivate:[AuthGuard]},
    {path:'contribuyentes/page/:page',component:ContribuyentesComponent,canActivate:[AuthGuard]},
    {path:'contribuyentes/page/:page/contribuyenteF/form',component:FormComponent,canActivate:[AuthGuard]},
    {path:'contribuyentes/contribuyenteF/form',component:FormComponent,canActivate:[AuthGuard]},
    {path:'contribuyentes/contribuyenteF/form/:id',component:FormComponent,canActivate:[AuthGuard]},
    {path:'contribuyentes/page/:page/contribuyenteF/form/:id',component:FormComponent,canActivate:[AuthGuard]},
    {path:'contribuyentes/contribuyenteM/form',component:FormMoralComponent,canActivate:[AuthGuard]},
    {path:'contribuyentes/page/:page/contribuyenteM/form',component:FormMoralComponent,canActivate:[AuthGuard]},
    {path:'contribuyentes/contribuyenteM/form/:id',component:FormMoralComponent,canActivate:[AuthGuard]},
    {path:'contribuciones',component:ContribucionesComponent,canActivate:[AuthGuard]},
    {path:'contribuciones/formContribuciones',component:FormContribucionesComponent,canActivate:[AuthGuard]},
    {path:'contribuciones/page/:page/formContribuciones',component:FormContribucionesComponent,canActivate:[AuthGuard]},
    {path:'contribuciones/page/:page',component:ContribucionesComponent,canActivate:[AuthGuard]},
    {path:'empleados',component:EmpleadosComponent,canActivate:[AuthGuard]},
    {path:'empleados/page/:page',component:EmpleadosComponent,canActivate:[AuthGuard]},
    {path:'empleados/formEmpleados',component:EmpleadoFormComponent,canActivate:[AuthGuard]},
    {path:'empleados/formEmpleados/:id',component:EmpleadoFormComponent,canActivate:[AuthGuard]},
    {path:'empleados/page/:page/formEmpleados',component:EmpleadoFormComponent,canActivate:[AuthGuard]},
    {path:'empleados/page/:page/formEmpleados/:id',component:EmpleadoFormComponent,canActivate:[AuthGuard]}
    ],canActivate:[AuthGuard]  ,
    
  },{path:'formContribuciones',component:FormContribucionesComponent,canActivate:[AuthGuard]},
  //{path:'contribuyentes',component:ContribuyentesComponent},
  //{path:'login',component:LoginComponent},
  //{path:'contribuyenteF/form',component:FormComponent}
  //{path:'contribuciones',component:LoginComponent},
  //{path:'detalleCobro',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
