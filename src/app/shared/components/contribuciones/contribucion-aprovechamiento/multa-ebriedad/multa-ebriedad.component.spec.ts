import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultaEbriedadComponent } from './multa-ebriedad.component';

describe('MultaEbriedadComponent', () => {
  let component: MultaEbriedadComponent;
  let fixture: ComponentFixture<MultaEbriedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultaEbriedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultaEbriedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
