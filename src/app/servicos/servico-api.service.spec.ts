import { TestBed } from '@angular/core/testing';

import { ServicoAPIService } from './servico-api.service';

describe('ServicoAPIService', () => {
  let service: ServicoAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
