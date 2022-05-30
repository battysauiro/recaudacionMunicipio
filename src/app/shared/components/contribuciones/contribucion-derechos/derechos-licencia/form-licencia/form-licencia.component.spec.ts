import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLicenciaComponent } from './form-licencia.component';

describe('FormLicenciaComponent', () => {
  let component: FormLicenciaComponent;
  let fixture: ComponentFixture<FormLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLicenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
