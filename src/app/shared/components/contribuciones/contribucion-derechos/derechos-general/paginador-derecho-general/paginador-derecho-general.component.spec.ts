import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorDerechoGeneralComponent } from './paginador-derecho-general.component';

describe('PaginadorDerechoGeneralComponent', () => {
  let component: PaginadorDerechoGeneralComponent;
  let fixture: ComponentFixture<PaginadorDerechoGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorDerechoGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorDerechoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
