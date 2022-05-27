import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalacioMunicipalComponent } from './palacio-municipal.component';

describe('PalacioMunicipalComponent', () => {
  let component: PalacioMunicipalComponent;
  let fixture: ComponentFixture<PalacioMunicipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalacioMunicipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalacioMunicipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
