import { TestBed } from '@angular/core/testing';

import { RestApiServiceService } from './rest-api-service.service';

describe('RestApiServiceService', () => {
  let service: RestApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
