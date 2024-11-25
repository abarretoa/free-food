import { TestBed } from '@angular/core/testing';

import { AlimentoService } from './alimento.service';

describe('FoodService', () => {
  let service: AlimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
