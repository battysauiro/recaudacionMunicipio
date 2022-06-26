import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesContribucionesComponent } from './reportes-contribuciones.component';

describe('ReportesContribucionesComponent', () => {
  let component: ReportesContribucionesComponent;
  let fixture: ComponentFixture<ReportesContribucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesContribucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesContribucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
