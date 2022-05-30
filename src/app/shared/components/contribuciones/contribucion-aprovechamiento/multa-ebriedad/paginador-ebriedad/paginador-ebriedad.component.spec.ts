import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorEbriedadComponent } from './paginador-ebriedad.component';

describe('PaginadorEbriedadComponent', () => {
  let component: PaginadorEbriedadComponent;
  let fixture: ComponentFixture<PaginadorEbriedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorEbriedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorEbriedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
