import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorOtrosProductosComponent } from './paginador-otros-productos.component';

describe('PaginadorOtrosProductosComponent', () => {
  let component: PaginadorOtrosProductosComponent;
  let fixture: ComponentFixture<PaginadorOtrosProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorOtrosProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorOtrosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
