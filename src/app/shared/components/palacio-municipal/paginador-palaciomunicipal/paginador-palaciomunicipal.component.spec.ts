import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorPalaciomunicipalComponent } from './paginador-palaciomunicipal.component';

describe('PaginadorPalaciomunicipalComponent', () => {
  let component: PaginadorPalaciomunicipalComponent;
  let fixture: ComponentFixture<PaginadorPalaciomunicipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorPalaciomunicipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorPalaciomunicipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
