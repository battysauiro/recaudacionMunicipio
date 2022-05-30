import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDerechoGeneralComponent } from './form-derecho-general.component';

describe('FormDerechoGeneralComponent', () => {
  let component: FormDerechoGeneralComponent;
  let fixture: ComponentFixture<FormDerechoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDerechoGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDerechoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
