import { TestBed } from '@angular/core/testing';

import { ContribucionesServiceService } from './contribuciones-service.service';

describe('ContribucionesServiceService', () => {
  let service: ContribucionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContribucionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
