import { TestBed } from '@angular/core/testing';

import { WebsiteHeadService } from './website-head.service';

describe('WebsiteHeadService', () => {
  let service: WebsiteHeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteHeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
