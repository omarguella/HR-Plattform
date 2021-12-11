import { TestBed } from '@angular/core/testing';

import { OpenCrxService } from './open-crx.service';

describe('OpenCrxService', () => {
  let service: OpenCrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenCrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
