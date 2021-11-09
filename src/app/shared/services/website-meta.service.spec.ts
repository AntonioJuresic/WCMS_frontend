import { TestBed } from '@angular/core/testing';

import { WebsiteMetaService } from './website-meta.service';

describe('WebsiteMetaService', () => {
  let service: WebsiteMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
