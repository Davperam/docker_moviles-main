import { TestBed } from '@angular/core/testing';

import { Documentosclinicos } from './documentosclinicos';

describe('Documentosclinicos', () => {
  let service: Documentosclinicos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Documentosclinicos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
