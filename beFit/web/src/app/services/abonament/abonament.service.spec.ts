import { TestBed } from '@angular/core/testing';

import { AbonamentService } from './abonament.service';

describe('AbonamentService', () => {
  let service: AbonamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
