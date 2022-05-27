import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPalacioComponent } from './form-palacio.component';

describe('FormPalacioComponent', () => {
  let component: FormPalacioComponent;
  let fixture: ComponentFixture<FormPalacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPalacioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPalacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
