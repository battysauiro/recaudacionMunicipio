import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImpuestoComponent } from './form-impuesto.component';

describe('FormImpuestoComponent', () => {
  let component: FormImpuestoComponent;
  let fixture: ComponentFixture<FormImpuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormImpuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
