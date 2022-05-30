import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVehicularComponent } from './form-vehicular.component';

describe('FormVehicularComponent', () => {
  let component: FormVehicularComponent;
  let fixture: ComponentFixture<FormVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVehicularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
