import { TestBed } from '@angular/core/testing';

import { Expedientealergia } from './expedientealergia';

describe('Expedientealergia', () => {
  let service: Expedientealergia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Expedientealergia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
