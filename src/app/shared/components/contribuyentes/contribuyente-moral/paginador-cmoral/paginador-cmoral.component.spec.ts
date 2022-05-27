import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorCmoralComponent } from './paginador-cmoral.component';

describe('PaginadorCmoralComponent', () => {
  let component: PaginadorCmoralComponent;
  let fixture: ComponentFixture<PaginadorCmoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorCmoralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorCmoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
