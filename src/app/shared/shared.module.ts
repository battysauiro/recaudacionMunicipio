import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import * as fromComponents from './components';
import { ContribuyentesComponent } from './components/contribuyentes/contribuyentes.component';
import { FormComponent } from './components/contribuyentes/form.component';
import { RouterModule } from '@angular/router';
import { FormMoralComponent } from './components/contribuyentes/form-moral.component';
import { ContribucionesComponent } from './components/contribuciones/contribuciones.component';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { PaginadorEmpleadoComponent } from './components/empleados/paginador/paginador.component';
import { PaginadorContribuyentesComponent } from './components/contribuyentes/paginador-contribuyentes/paginador-contribuyentes.component';
import { FormContribucionesComponent } from './components/contribuciones/form-contribuciones.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { EmpleadoFormComponent } from './components/empleados/empleado-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';


@NgModule({
  declarations: [...fromComponents.components, ContribuyentesComponent, FormComponent, FormMoralComponent, ContribucionesComponent, PaginadorComponent, PaginadorContribuyentesComponent, FormContribucionesComponent, EmpleadosComponent, EmpleadoFormComponent,PaginadorEmpleadoComponent, UsuariosComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
