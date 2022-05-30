import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorImpuestoComponent } from './paginador-impuesto.component';

describe('PaginadorImpuestoComponent', () => {
  let component: PaginadorImpuestoComponent;
  let fixture: ComponentFixture<PaginadorImpuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorImpuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorImpuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
