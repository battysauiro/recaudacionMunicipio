import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMultaComponent } from './form-multa.component';

describe('FormMultaComponent', () => {
  let component: FormMultaComponent;
  let fixture: ComponentFixture<FormMultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
