import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEbriedadComponent } from './form-ebriedad.component';

describe('FormEbriedadComponent', () => {
  let component: FormEbriedadComponent;
  let fixture: ComponentFixture<FormEbriedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEbriedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEbriedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
