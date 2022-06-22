import { TestBed } from '@angular/core/testing';

import { AwsCognitoService } from './aws-cognito.service';

describe('AwsCognitoService', () => {
  let service: AwsCognitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsCognitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
