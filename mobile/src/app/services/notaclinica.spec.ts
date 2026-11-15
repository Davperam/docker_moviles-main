import { TestBed } from '@angular/core/testing';

import { Notaclinica } from './notaclinica';

describe('Notaclinica', () => {
  let service: Notaclinica;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notaclinica);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
