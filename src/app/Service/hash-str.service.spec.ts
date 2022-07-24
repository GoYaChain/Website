import { TestBed } from '@angular/core/testing';

import { HashStrService } from './hash-str.service';

describe('HashStrService', () => {
  let service: HashStrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashStrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
