import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaFolioComponent } from './captura-folio.component';

describe('CapturaFolioComponent', () => {
  let component: CapturaFolioComponent;
  let fixture: ComponentFixture<CapturaFolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaFolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
