import { TestBed } from '@angular/core/testing';

import { BonussalaryService } from './bonussalary.service';

describe('BonussalaryService', () => {
  let service: BonussalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonussalaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
