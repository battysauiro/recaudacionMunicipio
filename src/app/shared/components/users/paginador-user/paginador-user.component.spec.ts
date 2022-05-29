import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorUserComponent } from './paginador-user.component';

describe('PaginadorUserComponent', () => {
  let component: PaginadorUserComponent;
  let fixture: ComponentFixture<PaginadorUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
