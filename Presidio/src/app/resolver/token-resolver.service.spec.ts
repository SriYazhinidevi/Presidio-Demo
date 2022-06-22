import { TestBed } from '@angular/core/testing';

import { TokenResolverService } from './token-resolver.service';

describe('TokenResolverService', () => {
  let service: TokenResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
