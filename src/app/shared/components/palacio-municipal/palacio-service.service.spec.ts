import { TestBed } from '@angular/core/testing';

import { PalacioServiceService } from './palacio-service.service';

describe('PalacioServiceService', () => {
  let service: PalacioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalacioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
