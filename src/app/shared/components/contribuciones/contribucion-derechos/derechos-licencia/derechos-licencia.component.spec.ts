import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerechosLicenciaComponent } from './derechos-licencia.component';

describe('DerechosLicenciaComponent', () => {
  let component: DerechosLicenciaComponent;
  let fixture: ComponentFixture<DerechosLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DerechosLicenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DerechosLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
