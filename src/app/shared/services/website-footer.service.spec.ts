import { TestBed } from '@angular/core/testing';

import { WebsiteFooterService } from './website-footer.service';

describe('WebsiteFooterService', () => {
  let service: WebsiteFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
