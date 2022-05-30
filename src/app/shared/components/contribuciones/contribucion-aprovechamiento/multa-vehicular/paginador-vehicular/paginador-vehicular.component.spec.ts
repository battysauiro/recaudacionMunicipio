import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorVehicularComponent } from './paginador-vehicular.component';

describe('PaginadorVehicularComponent', () => {
  let component: PaginadorVehicularComponent;
  let fixture: ComponentFixture<PaginadorVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorVehicularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
