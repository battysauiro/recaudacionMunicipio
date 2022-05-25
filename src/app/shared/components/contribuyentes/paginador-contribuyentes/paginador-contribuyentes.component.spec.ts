import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorContribuyentesComponent } from './paginador-contribuyentes.component';

describe('PaginadorContribuyentesComponent', () => {
  let component: PaginadorContribuyentesComponent;
  let fixture: ComponentFixture<PaginadorContribuyentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorContribuyentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorContribuyentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
