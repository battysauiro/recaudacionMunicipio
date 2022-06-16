import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaCapturaComponent } from './linea-captura.component';

describe('LineaCapturaComponent', () => {
  let component: LineaCapturaComponent;
  let fixture: ComponentFixture<LineaCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaCapturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
