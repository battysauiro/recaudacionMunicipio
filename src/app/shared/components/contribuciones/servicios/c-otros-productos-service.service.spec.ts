import { TestBed } from '@angular/core/testing';

import { COtrosProductosServiceService } from './c-otros-productos-service.service';

describe('COtrosProductosServiceService', () => {
  let service: COtrosProductosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(COtrosProductosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
