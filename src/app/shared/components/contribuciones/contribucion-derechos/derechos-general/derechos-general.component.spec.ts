import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerechosGeneralComponent } from './derechos-general.component';

describe('DerechosGeneralComponent', () => {
  let component: DerechosGeneralComponent;
  let fixture: ComponentFixture<DerechosGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DerechosGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DerechosGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
