import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOtrosProductosComponent } from './form-otros-productos.component';

describe('FormOtrosProductosComponent', () => {
  let component: FormOtrosProductosComponent;
  let fixture: ComponentFixture<FormOtrosProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOtrosProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOtrosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
