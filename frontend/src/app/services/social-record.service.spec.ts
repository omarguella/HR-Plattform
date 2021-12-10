import { TestBed } from '@angular/core/testing';

import { SocialRecordService } from './social-record.service';

describe('SocialRecordService', () => {
  let service: SocialRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
