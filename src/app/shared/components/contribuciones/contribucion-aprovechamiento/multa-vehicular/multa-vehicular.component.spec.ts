import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultaVehicularComponent } from './multa-vehicular.component';

describe('MultaVehicularComponent', () => {
  let component: MultaVehicularComponent;
  let fixture: ComponentFixture<MultaVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultaVehicularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultaVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
