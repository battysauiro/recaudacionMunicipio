import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorLicenciaComponent } from './paginador-licencia.component';

describe('PaginadorLicenciaComponent', () => {
  let component: PaginadorLicenciaComponent;
  let fixture: ComponentFixture<PaginadorLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorLicenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
