import { TestBed } from '@angular/core/testing';

import { PreviousrouteService } from './previousroute.service';

describe('PreviousrouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreviousrouteService = TestBed.get(PreviousrouteService);
    expect(service).toBeTruthy();
  });
});
