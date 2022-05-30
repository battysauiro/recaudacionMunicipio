import { TestBed } from '@angular/core/testing';

import { CAMultaEbriedadServiceService } from './c-amulta-ebriedad-service.service';

describe('CAMultaEbriedadServiceService', () => {
  let service: CAMultaEbriedadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CAMultaEbriedadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
