import { TestBed } from '@angular/core/testing';

import { Expedienteclinico } from './expedienteclinico';

describe('Expedienteclinico', () => {
  let service: Expedienteclinico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Expedienteclinico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
