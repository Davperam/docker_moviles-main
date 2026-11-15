import { TestBed } from '@angular/core/testing';

import { Odontogramas } from './odontogramas';

describe('Odontogramas', () => {
  let service: Odontogramas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Odontogramas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
