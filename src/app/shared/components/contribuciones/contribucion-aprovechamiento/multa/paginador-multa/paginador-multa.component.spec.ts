import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorMultaComponent } from './paginador-multa.component';

describe('PaginadorMultaComponent', () => {
  let component: PaginadorMultaComponent;
  let fixture: ComponentFixture<PaginadorMultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginadorMultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorMultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
