import { TestBed } from '@angular/core/testing';

import { ContribuyenteServiceService } from './contribuyente-service.service';

describe('ContribuyenteServiceService', () => {
  let service: ContribuyenteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContribuyenteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
