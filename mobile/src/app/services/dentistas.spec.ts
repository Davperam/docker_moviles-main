import { TestBed } from '@angular/core/testing';

import { Dentistas } from './dentistas';

describe('Dentistas', () => {
  let service: Dentistas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dentistas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
