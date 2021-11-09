import { TestBed } from '@angular/core/testing';

import { WebsiteHeaderService } from './website-header.service';

describe('WebsiteHeaderService', () => {
  let service: WebsiteHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
