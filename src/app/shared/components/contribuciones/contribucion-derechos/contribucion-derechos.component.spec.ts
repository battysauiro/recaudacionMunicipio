import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribucionDerechosComponent } from './contribucion-derechos.component';

describe('ContribucionDerechosComponent', () => {
  let component: ContribucionDerechosComponent;
  let fixture: ComponentFixture<ContribucionDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribucionDerechosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribucionDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
