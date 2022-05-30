import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosProductosComponent } from './otros-productos.component';

describe('OtrosProductosComponent', () => {
  let component: OtrosProductosComponent;
  let fixture: ComponentFixture<OtrosProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrosProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
