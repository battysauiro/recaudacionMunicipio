import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContribuyenteMoralComponent } from './contribuyente-moral.component';

describe('ContribuyenteMoralComponent', () => {
  let component: ContribuyenteMoralComponent;
  let fixture: ComponentFixture<ContribuyenteMoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContribuyenteMoralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContribuyenteMoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
