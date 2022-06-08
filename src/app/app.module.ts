import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LoginComponent } from './usuarios/login/login.component';
import { ContribuyenteService } from '@shared/components/contribuyentes/contribuyente.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContribuyentesComponent } from '@shared/components/contribuyentes/contribuyentes.component';
import { ContribucionesServiceService } from '@shared/components/contribuciones/contribuciones-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertModule } from './alerts/alert/alert.module';
import { FiltroUsuarioPipe } from './pipes/filtro-usuario.pipe';
import { FiltroContribucionesPipe } from './pipes/filtro-contribuciones.pipe';



//registerLocaleData(localeEs,'es-MX')
@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    FooterComponent,
    NavigationComponent,
    LoginComponent
    
  ],
  imports: [//aqui van los modulos
    AlertModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    ContribuyenteService,
    ContribucionesServiceService,
    {
      provide: LocationStrategy,
      useClass:PathLocationStrategy
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function registerLocaleData(localeEs: any, arg1: string) {
  throw new Error('Function not implemented.');
}

function localeEs(localeEs: any, arg1: string) {
  throw new Error('Function not implemented.');
}

