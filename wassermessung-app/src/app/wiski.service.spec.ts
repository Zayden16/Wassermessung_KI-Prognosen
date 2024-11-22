import { TestBed } from '@angular/core/testing';

import { WiskiService } from './wiski.service';

describe('WiskiService', () => {
  let service: WiskiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WiskiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
